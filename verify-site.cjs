const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.join(__dirname,'dist');
const data=vm.runInNewContext(fs.readFileSync(path.join(root,'content.js'),'utf8')+';({awards,categories,projects})');
assert.equal(data.awards.length,19);assert.equal(new Set(data.awards.map(a=>a.id)).size,19);
let images=0;
for(const a of data.awards){assert(data.categories.some(c=>c.id===a.category));for(const key of ['image','pdf'])if(a[key]){assert(fs.existsSync(path.join(root,'assets',a[key])),a[key]+' is missing');if(key==='image')images++}}
assert.equal(images,16);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){const ref=match[1];if(ref.startsWith('#'))assert(html.includes('id="'+ref.slice(1)+'"'),'Missing anchor '+ref);else if(!/^(https?:|mailto:)/.test(ref))assert(fs.existsSync(path.join(root,ref)),'Missing asset '+ref)}
assert(!fs.readdirSync(path.join(root,'assets')).some(x=>/CV/i.test(x)),'Source CV must not be published');
const knownPhonePattern=/(?:\+91[\s-]*\d[\d\s-]{8,}|tel:)/;
for(const name of ['index.html','app.js','content.js','styles.css'])assert(!knownPhonePattern.test(fs.readFileSync(path.join(root,name),'utf8')),'Phone found in '+name);
console.log('PASS: 19 distinct entries, 16 individual image assets, document links and anchors exist; no CV or personal phone in website sources.');
