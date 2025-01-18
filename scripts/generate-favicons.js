import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const sizes = {
  favicon: [32, 32],
  apple: [180, 180],
  android: [192, 192],
  large: [512, 512],
};

async function generateFavicons() {
  const sourceFile = path.join(process.cwd(), "public", "favicon.svg");

  try {
    await fs.mkdir(path.join(process.cwd(), "public"), { recursive: true });

    const input = await fs.readFile(sourceFile);

    await Promise.all([
      sharp(input)
        .resize(sizes.favicon[0], sizes.favicon[1])
        .toFormat("png")
        .toFile(path.join(process.cwd(), "public", "favicon.ico")),

      // PNG para Apple Touch Icon
      sharp(input)
        .resize(sizes.apple[0], sizes.apple[1])
        .toFormat("png")
        .toFile(path.join(process.cwd(), "public", "apple-touch-icon.png")),

      // PNG para Android
      sharp(input)
        .resize(sizes.android[0], sizes.android[1])
        .toFormat("png")
        .toFile(
          path.join(process.cwd(), "public", "android-chrome-192x192.png")
        ),

      // Ícone grande para PWA
      sharp(input)
        .resize(sizes.large[0], sizes.large[1])
        .toFormat("png")
        .toFile(
          path.join(process.cwd(), "public", "android-chrome-512x512.png")
        ),
    ]);

    console.log("✅ Favicons gerados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao gerar favicons:", error);
  }
}

generateFavicons();
