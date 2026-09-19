# V.Vrajesh — Personal portfolio

A static portfolio featuring projects, education stories, interactive motion, and an individual certificate and award gallery.

## Preview and verify

With Node.js installed, run `node preview.cjs` and open http://127.0.0.1:4173. Run `node verify-site.cjs` to check content references and assets.

## Vercel deployment

Import the GitHub repository into Vercel with the repository root as the root directory. The included `vercel.json` selects framework Other, no build command, and output directory `dist`.

Connect the production branch to automatically deploy future updates. Add a purchased domain in the project's domain settings and follow Vercel's DNS instructions.

## Content

- `dist/index.html`: page structure and main text.
- `dist/content.js`: award and project data.
- `dist/assets/`: individual images and certificate downloads.
- `dist/schools.js`: school and teacher stories.
- Other CSS and JavaScript files in `dist/`: appearance and interactions.

Keep original CVs, private working notes, temporary files, credentials, and phone numbers out of the public repository and downloads.

Personal images and certificates remain their respective owners' material. No reuse license is granted by this repository.
