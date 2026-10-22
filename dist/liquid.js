// Additive integration: the original cover and three forms remain the default.
const art=document.querySelector('.hero-art'), choice=document.querySelector('#liquid-choice');
const stage=document.createElement('div');stage.id='liquid-stage';stage.hidden=true;
stage.innerHTML='<img alt="Interwoven metallic liquid sculpture" crossorigin="anonymous"><canvas tabindex="0" role="img" aria-label="Liquid sculpture. Move over it, tap, or press Enter to stir the particles."></canvas><a class="liquid-credit" href="https://guglielmogiannattasio.it" target="_blank" rel="noopener">Liquid study · Guglielmo Giannattasio ↗</a>';
art.append(stage);
const image=stage.querySelector('img'),canvas=stage.querySelector('canvas'),mq=matchMedia('(prefers-reduced-motion: reduce)');
let engine=null,active=false,visible=true,started=false,failed=false;
const quiet=()=>mq.matches||document.body.classList.contains('motion-paused');
function sync(){engine?.setOptions({interactive:!quiet(),reducedMotion:quiet()});engine?.setVisible(active&&visible&&!document.hidden&&!quiet());}
function resize(){if(!engine)return;const w=stage.clientWidth,h=stage.clientHeight,a=image.naturalWidth/image.naturalHeight||2.5,rw=Math.min(w*.98,h*.85*a),rh=rw/a;engine.resize(w,h,{x:(w-rw)/2,y:(h-rh)/2,w:rw,h:rh});}
function fallback(){failed=true;stage.classList.remove('ready');engine?.setVisible(false);}
async function start(){if(started)return;started=true;
 image.src='https://cdn.21st.dev/assets/mirror/a1/a1fa387b6e417b26a25f317559c87cce4d241c1052c52a2b3bc2966b2aaf9b65.webp';
 try{await image.decode();const {LiquidEngine}=await import('./liquid-engine.js');
 engine=new LiquidEngine(canvas,{interactive:!quiet(),strength:1,radius:220,density:.5,dotSize:1,spread:1,turbulence:1,returnSpeed:1,streaks:true,restStyle:'image',ambient:true,ambientIntensity:.18,speed:1,intro:false,reducedMotion:quiet(),bg:[.067,.067,.063],imgBg:null,liquid:1},fallback);
 engine.onFirstFrame=()=>{if(!failed)stage.classList.add('ready');};resize();engine.setImage(image);sync();
 }catch{fallback();if(!image.naturalWidth){stage.hidden=true;art.classList.remove('liquid-active');choice.setAttribute('aria-pressed','false');document.querySelector('[data-form="0"]').click();choice.textContent='Liquid unavailable';}}
}
choice.addEventListener('click',()=>{active=true;stage.hidden=false;art.classList.add('liquid-active');document.querySelectorAll('[data-form]').forEach(b=>b.setAttribute('aria-pressed','false'));choice.setAttribute('aria-pressed','true');start();resize();sync();});
document.querySelectorAll('[data-form]').forEach(b=>b.addEventListener('click',()=>{active=false;stage.hidden=true;art.classList.remove('liquid-active');choice.setAttribute('aria-pressed','false');sync();}));
for(const [event,type] of [['pointermove','move'],['pointerdown','down'],['pointerup','up'],['pointerleave','leave'],['pointercancel','leave']])canvas.addEventListener(event,e=>{if(quiet())return;const r=canvas.getBoundingClientRect();engine?.pointer(type,(e.clientX-r.left)*canvas.clientWidth/r.width,(e.clientY-r.top)*canvas.clientHeight/r.height,e.pointerType==='touch');},{passive:true});
canvas.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!quiet()){e.preventDefault();engine?.pointer('down',canvas.clientWidth*.5,canvas.clientHeight*.5,true);engine?.pointer('up',canvas.clientWidth*.5,canvas.clientHeight*.5,true);}});
new ResizeObserver(resize).observe(stage);
new IntersectionObserver(es=>{visible=es[0].isIntersecting;sync();}).observe(art);
new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});mq.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
addEventListener('pagehide',()=>engine?.setVisible(false));addEventListener('pageshow',sync);
