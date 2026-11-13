// Compiles resume/resume.typ (+ resume.yaml) into public/Quinton-Miller-Resume.pdf.
// Runs automatically before `next build` via the prebuild script.
//
// Tailored variants: `npm run resume:build -- <variant>` reads
// resume/local/<variant>/resume.yaml and writes the PDF next to it.
// resume/local/ is git-ignored, so variants never reach the public site.
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NodeCompiler } from '@myriaddreamin/typst-ts-node-compiler';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mainFilePath = join(root, 'resume', 'resume.typ');
const fileName = 'Quinton-Miller-Resume.pdf';

const variant = process.argv[2];
if (variant && !/^[a-z0-9-]+$/.test(variant)) {
  console.error(`Invalid variant name "${variant}" (use lowercase letters, digits, and dashes).`);
  process.exit(1);
}

const variantDir = variant && join(root, 'resume', 'local', variant);
if (variant && !existsSync(join(variantDir, 'resume.yaml'))) {
  console.error(`No resume data at ${join(variantDir, 'resume.yaml')}`);
  process.exit(1);
}

// The data path is resolved by Typst relative to resume.typ.
const inputs = variant ? { data: `local/${variant}/resume.yaml` } : {};
const outPath = variant ? join(variantDir, fileName) : join(root, 'public', fileName);

const compiler = NodeCompiler.create({ workspace: root, inputs });

const doc = compiler.compile({ mainFilePath });
const diagnostics = compiler.fetchDiagnostics(doc);
for (const d of diagnostics) {
  console.error(`[typst ${d.severity}] ${d.message}`);
}
if (diagnostics.some((d) => d.severity === 'error')) {
  process.exit(1);
}

const pdf = compiler.pdf({ mainFilePath });
writeFileSync(outPath, pdf);
console.log(`Wrote ${outPath} (${(pdf.length / 1024).toFixed(1)} KiB)`);
