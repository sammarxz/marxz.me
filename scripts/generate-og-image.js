import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

async function generateOgImage() {
  const sourceFile = path.join(process.cwd(), "public", "og-image.svg");
  const outputFile = path.join(process.cwd(), "public", "og-image.png");

  try {
    // Lê o arquivo SVG fonte
    const input = await fs.readFile(sourceFile);

    // Converte para PNG com alta qualidade
    await sharp(input)
      .resize(1200, 630, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({
        quality: 100,
        compressionLevel: 9,
      })
      .toFile(outputFile);

    console.log("✅ OG Image gerada com sucesso!");

    // Gera uma versão de preview em tamanho menor
    await sharp(input)
      .resize(600, 315, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({
        quality: 100,
        compressionLevel: 9,
      })
      .toFile(path.join(process.cwd(), "public", "og-image-preview.png"));

    console.log("✅ Preview da OG Image gerada com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao gerar OG Image:", error);
  }
}

generateOgImage();
