// Compiles resume/resume.typ (+ resume.yaml) into public/Quinton-Miller-Resume.pdf.
// Runs automatically before `next build` via the prebuild script.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NodeCompiler } from '@myriaddreamin/typst-ts-node-compiler';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mainFilePath = join(root, 'resume', 'resume.typ');
const outPath = join(root, 'public', 'Quinton-Miller-Resume.pdf');

const compiler = NodeCompiler.create({ workspace: root });

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
