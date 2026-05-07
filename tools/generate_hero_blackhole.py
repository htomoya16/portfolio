from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
INPUT_DIR = ROOT / "public" / "assets" / "hero" / "frames"
OUTPUT_DIR = ROOT / "public" / "assets" / "hero" / "generated"
OUTPUT_WEBP = OUTPUT_DIR / "blackhole-pixel.webp"
OUTPUT_POSTER = OUTPUT_DIR / "blackhole-pixel-poster.png"

SOURCE_SIZE = (1536, 1024)
HERO_SIZE = (960, 640)
PIXEL_SIZE = (480, 320)
FRAME_DURATION_MS = 110

PALETTE = [
    (0, 0, 0, 0),
    (2, 8, 23, 255),
    (6, 16, 35, 248),
    (21, 40, 75, 230),
    (48, 88, 170, 218),
    (67, 103, 255, 224),
    (112, 157, 255, 232),
    (172, 205, 255, 238),
    (224, 239, 255, 244),
    (255, 255, 255, 255),
]


def build_palette_image() -> Image.Image:
    palette_image = Image.new("P", (1, 1))
    flat_palette: list[int] = []
    for red, green, blue, _alpha in PALETTE:
        flat_palette.extend([red, green, blue])
    flat_palette.extend([0, 0, 0] * (256 - len(PALETTE)))
    palette_image.putpalette(flat_palette)
    return palette_image


def colorize_frame(frame: Image.Image) -> Image.Image:
    frame = ImageOps.fit(frame.convert("RGBA"), SOURCE_SIZE, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    frame = frame.resize(PIXEL_SIZE, Image.Resampling.LANCZOS)

    alpha = frame.getchannel("A")
    gray = ImageOps.grayscale(frame)
    gray = ImageEnhance.Contrast(gray).enhance(1.42)
    gray = ImageEnhance.Brightness(gray).enhance(1.08)

    tinted = ImageOps.colorize(
        gray,
        black="#020817",
        white="#ffffff",
        mid="#4367ff",
        blackpoint=10,
        whitepoint=236,
        midpoint=128,
    ).convert("RGBA")

    # Preserve the black core and strong light bands while making weak pixels fade into the Hero background.
    boosted_alpha = ImageEnhance.Contrast(alpha).enhance(1.22)
    boosted_alpha = ImageEnhance.Brightness(boosted_alpha).enhance(1.1)
    tinted.putalpha(boosted_alpha)

    quantized = tinted.convert("RGB").quantize(
        palette=build_palette_image(),
        dither=Image.Dither.FLOYDSTEINBERG,
    ).convert("RGBA")
    quantized.putalpha(boosted_alpha)
    pixelated = quantized.resize(HERO_SIZE, Image.Resampling.NEAREST)

    glow = pixelated.filter(ImageFilter.GaussianBlur(radius=2.2))
    glow_alpha = glow.getchannel("A").point(lambda value: min(150, int(value * 0.54)))
    glow.putalpha(glow_alpha)

    canvas = Image.new("RGBA", HERO_SIZE, (0, 0, 0, 0))
    canvas.alpha_composite(glow)
    canvas.alpha_composite(pixelated)
    return canvas


def main() -> None:
    frame_paths = sorted(INPUT_DIR.glob("blackhole_frame_*.png"))
    if len(frame_paths) != 16:
        raise SystemExit(f"Expected 16 frames in {INPUT_DIR}, found {len(frame_paths)}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    frames = [colorize_frame(Image.open(path)) for path in frame_paths]

    frames[0].save(OUTPUT_POSTER, optimize=True)
    frames[0].save(
        OUTPUT_WEBP,
        save_all=True,
        append_images=frames[1:],
        duration=FRAME_DURATION_MS,
        loop=0,
        lossless=True,
        quality=92,
        method=6,
    )

    print(f"wrote {OUTPUT_WEBP.relative_to(ROOT)}")
    print(f"wrote {OUTPUT_POSTER.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
