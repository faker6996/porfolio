import { CanvasTexture, LinearSRGBColorSpace, NearestFilter } from "three";

/**
 * Procedurally generates a high-definition 4x4 facial expression spritesheet
 * with exact pixel-perfect alignment to the avatar's 3D face quad UV mapping:
 * - Eyebrows: Y = 62..68, X = 54..98 & 158..202
 * - Eyes: Center at (76, 98) & (180, 98), Radius = 21px
 * - Mouth (Expressive frames): Centered at (128, 146)
 *
 * Features: Warm, friendly Asian eyes with double catchlights, natural straight brows,
 * and charming symmetrical expressions.
 */
export const createVietnameseFaceTexture = (): CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get 2d context for face canvas");
  }

  const TILE_SIZE = 256;
  const COLS = 4;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Helper: Soft, natural, straight-curved masculine eyebrows
  const drawEyebrow = (
    c: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    midX: number,
    midY: number,
    endX: number,
    endY: number,
    thickness = 4.8,
    color = "#201816"
  ) => {
    c.save();
    c.strokeStyle = color;
    c.lineWidth = thickness;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.beginPath();
    c.moveTo(startX, startY);
    c.quadraticCurveTo(midX, midY, endX, endY);
    c.stroke();
    c.restore();
  };

  // Helper: Warm Asian eyes with double catchlights and smooth blink transitions
  const drawAsianEye = (
    c: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    openRatio: number, // 1.0 = fully open, 0.0 = closed
    isHappy = false
  ) => {
    c.save();

    const eyeRadius = 21;
    const eyeH = Math.max(1, eyeRadius * openRatio);

    if (openRatio <= 0.12) {
      // Closed eyelid curve
      c.strokeStyle = "#1e1614";
      c.lineWidth = 4.2;
      c.lineCap = "round";
      c.beginPath();
      if (isHappy) {
        // Happy crescent (^ _ ^)
        c.moveTo(centerX - eyeRadius * 0.9, centerY + 1);
        c.quadraticCurveTo(centerX, centerY - 12, centerX + eyeRadius * 0.9, centerY + 1);
        c.stroke();
      } else {
        // Sleeping peaceful curve
        c.moveTo(centerX - eyeRadius * 0.9, centerY - 3);
        c.quadraticCurveTo(centerX, centerY + 8, centerX + eyeRadius * 0.9, centerY - 3);
        c.stroke();
      }
      c.restore();
      return;
    }

    // 1. Sclera (White of the eye)
    c.beginPath();
    c.ellipse(centerX, centerY, eyeRadius, eyeH, 0, 0, Math.PI * 2);
    c.fillStyle = "#ffffff";
    c.fill();
    c.lineWidth = 3.2;
    c.strokeStyle = "#1e1614";
    c.stroke();

    // 2. Iris & Pupil
    c.save();
    c.beginPath();
    c.ellipse(centerX, centerY, eyeRadius - 0.5, eyeH - 0.5, 0, 0, Math.PI * 2);
    c.clip();

    const irisRadius = 15.5;
    const irisGrad = c.createRadialGradient(
      centerX - 2,
      centerY - 2,
      2,
      centerX,
      centerY,
      irisRadius
    );
    irisGrad.addColorStop(0, "#3e281e");
    irisGrad.addColorStop(0.6, "#221510");
    irisGrad.addColorStop(1, "#100a08");

    c.fillStyle = irisGrad;
    c.beginPath();
    c.arc(centerX, centerY, irisRadius, 0, Math.PI * 2);
    c.fill();

    // Dark pupil
    c.fillStyle = "#050403";
    c.beginPath();
    c.arc(centerX, centerY, 7.5, 0, Math.PI * 2);
    c.fill();

    // Primary bright catchlight
    c.fillStyle = "#ffffff";
    c.beginPath();
    c.arc(centerX - 4.5, centerY - 4.5, 4.2, 0, Math.PI * 2);
    c.fill();

    // Secondary subtle catchlight
    c.fillStyle = "rgba(255, 255, 255, 0.85)";
    c.beginPath();
    c.arc(centerX + 5.0, centerY + 4.0, 2.4, 0, Math.PI * 2);
    c.fill();

    c.restore();

    // 3. Eyeliner & Double eyelid fold
    c.strokeStyle = "#1a1210";
    c.lineWidth = 3.5;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(centerX - eyeRadius - 1, centerY);
    c.quadraticCurveTo(centerX, centerY - eyeH - 1, centerX + eyeRadius + 1, centerY);
    c.stroke();

    if (openRatio > 0.6) {
      c.strokeStyle = "rgba(75, 48, 38, 0.35)";
      c.lineWidth = 1.6;
      c.beginPath();
      c.moveTo(centerX - eyeRadius * 0.7, centerY - eyeH - 3.5);
      c.quadraticCurveTo(centerX, centerY - eyeH - 6.0, centerX + eyeRadius * 0.7, centerY - eyeH - 3.5);
      c.stroke();
    }

    c.restore();
  };

  // Helper: Symmetrical, warm mouth
  const drawMouth = (
    c: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    type: "smile" | "happy" | "sleep" | "surprised"
  ) => {
    c.save();
    c.strokeStyle = "#42221b";
    c.lineWidth = 3.4;
    c.lineCap = "round";
    c.lineJoin = "round";

    if (type === "smile") {
      // Gentle warm smile
      c.beginPath();
      c.moveTo(centerX - 16, centerY - 2);
      c.quadraticCurveTo(centerX, centerY + 10, centerX + 16, centerY - 2);
      c.stroke();
    } else if (type === "happy") {
      // Radiant open smile with teeth
      c.beginPath();
      c.moveTo(centerX - 18, centerY - 3);
      c.quadraticCurveTo(centerX, centerY + 14, centerX + 18, centerY - 3);
      c.closePath();
      c.fillStyle = "#9e3e39";
      c.fill();
      c.stroke();

      // Top teeth
      c.fillStyle = "#ffffff";
      c.beginPath();
      c.moveTo(centerX - 13, centerY - 2);
      c.quadraticCurveTo(centerX, centerY + 3.5, centerX + 13, centerY - 2);
      c.lineTo(centerX + 13, centerY - 3);
      c.lineTo(centerX - 13, centerY - 3);
      c.closePath();
      c.fill();
    } else if (type === "sleep") {
      // Peaceful soft sleeping smile
      c.beginPath();
      c.moveTo(centerX - 10, centerY);
      c.quadraticCurveTo(centerX, centerY + 4, centerX + 10, centerY);
      c.stroke();
    } else if (type === "surprised") {
      // Surprised small 'o'
      c.beginPath();
      c.ellipse(centerX, centerY + 2, 7, 9, 0, 0, Math.PI * 2);
      c.fillStyle = "#7e2c28";
      c.fill();
      c.stroke();
    }

    c.restore();
  };

  const drawTile = (tileIndex: number) => {
    const col = tileIndex % COLS;
    const row = Math.floor(tileIndex / COLS);

    const x = col * TILE_SIZE;
    const y = row * TILE_SIZE;

    ctx.save();
    ctx.translate(x, y);

    const eyeLeftX = 76;
    const eyeRightX = 180;
    const eyeY = 98;
    const browY = 64;
    const mouthX = 128;
    const mouthY = 146;

    switch (tileIndex) {
      // Row 0: Default Idle & Blinking
      case 0: // default-0: Clean, handsome, friendly look
        drawEyebrow(ctx, 54, browY + 2, 76, browY - 2, 98, browY + 1);
        drawEyebrow(ctx, 158, browY + 1, 180, browY - 2, 202, browY + 2);
        drawAsianEye(ctx, eyeLeftX, eyeY, 1.0);
        drawAsianEye(ctx, eyeRightX, eyeY, 1.0);
        break;

      case 1: // default-1: Blink 35%
        drawEyebrow(ctx, 54, browY + 2, 76, browY - 1, 98, browY + 1);
        drawEyebrow(ctx, 158, browY + 1, 180, browY - 1, 202, browY + 2);
        drawAsianEye(ctx, eyeLeftX, eyeY, 0.65);
        drawAsianEye(ctx, eyeRightX, eyeY, 0.65);
        break;

      case 2: // default-2: Blink 75%
        drawEyebrow(ctx, 54, browY + 3, 76, browY, 98, browY + 2);
        drawEyebrow(ctx, 158, browY + 2, 180, browY, 202, browY + 3);
        drawAsianEye(ctx, eyeLeftX, eyeY, 0.25);
        drawAsianEye(ctx, eyeRightX, eyeY, 0.25);
        break;

      case 3: // default-3: Blink closed
        drawEyebrow(ctx, 54, browY + 3, 76, browY + 1, 98, browY + 2);
        drawEyebrow(ctx, 158, browY + 2, 180, browY + 1, 202, browY + 3);
        drawAsianEye(ctx, eyeLeftX, eyeY, 0.0);
        drawAsianEye(ctx, eyeRightX, eyeY, 0.0);
        break;

      // Row 1: Sleeping
      case 4: // sleeping
      case 5:
      case 6:
      case 7:
        drawEyebrow(ctx, 56, browY + 4, 76, browY + 2, 98, browY + 3, 4.2);
        drawEyebrow(ctx, 158, browY + 3, 180, browY + 2, 200, browY + 4, 4.2);
        drawAsianEye(ctx, eyeLeftX, eyeY + 2, 0.0, false);
        drawAsianEye(ctx, eyeRightX, eyeY + 2, 0.0, false);
        drawMouth(ctx, mouthX, mouthY - 4, "sleep");
        break;

      // Row 2: Wake Up Transitions
      case 8: // contact-transition-0 (waking up squint)
        drawEyebrow(ctx, 54, browY + 1, 76, browY - 3, 98, browY);
        drawEyebrow(ctx, 158, browY, 180, browY - 3, 202, browY + 1);
        drawAsianEye(ctx, eyeLeftX, eyeY, 0.45);
        drawAsianEye(ctx, eyeRightX, eyeY, 0.45);
        drawMouth(ctx, mouthX, mouthY, "surprised");
        break;

      case 9: // contact-transition-1 (eyes opening)
        drawEyebrow(ctx, 54, browY, 76, browY - 4, 98, browY);
        drawEyebrow(ctx, 158, browY, 180, browY - 4, 202, browY);
        drawAsianEye(ctx, eyeLeftX, eyeY, 0.8);
        drawAsianEye(ctx, eyeRightX, eyeY, 0.8);
        drawMouth(ctx, mouthX, mouthY, "surprised");
        break;

      case 10: // contact-transition-2 (fully awake smile)
      case 11:
        drawEyebrow(ctx, 54, browY + 2, 76, browY - 2, 98, browY + 1);
        drawEyebrow(ctx, 158, browY + 1, 180, browY - 2, 202, browY + 2);
        drawAsianEye(ctx, eyeLeftX, eyeY, 1.0);
        drawAsianEye(ctx, eyeRightX, eyeY, 1.0);
        drawMouth(ctx, mouthX, mouthY, "smile");
        break;

      // Row 3: Proud / Waving (Radiant Hello)
      case 12: // proud-0 (happy open smile)
        drawEyebrow(ctx, 54, browY + 1, 76, browY - 3, 98, browY);
        drawEyebrow(ctx, 158, browY, 180, browY - 3, 202, browY + 1);
        drawAsianEye(ctx, eyeLeftX, eyeY, 1.0);
        drawAsianEye(ctx, eyeRightX, eyeY, 1.0);
        drawMouth(ctx, mouthX, mouthY, "happy");
        break;

      case 13: // proud-1 (happy half blink)
        drawEyebrow(ctx, 54, browY + 1, 76, browY - 2, 98, browY);
        drawEyebrow(ctx, 158, browY, 180, browY - 2, 202, browY + 1);
        drawAsianEye(ctx, eyeLeftX, eyeY, 0.55);
        drawAsianEye(ctx, eyeRightX, eyeY, 0.55);
        drawMouth(ctx, mouthX, mouthY, "happy");
        break;

      case 14: // proud-2 (happy nearly closed)
        drawEyebrow(ctx, 54, browY + 2, 76, browY - 1, 98, browY + 1);
        drawEyebrow(ctx, 158, browY + 1, 180, browY - 1, 202, browY + 2);
        drawAsianEye(ctx, eyeLeftX, eyeY, 0.2, true);
        drawAsianEye(ctx, eyeRightX, eyeY, 0.2, true);
        drawMouth(ctx, mouthX, mouthY, "happy");
        break;

      case 15: // proud-3 (crescent happy eyes ^ _ ^)
        drawEyebrow(ctx, 54, browY + 2, 76, browY - 2, 98, browY + 1);
        drawEyebrow(ctx, 158, browY + 1, 180, browY - 2, 202, browY + 2);
        drawAsianEye(ctx, eyeLeftX, eyeY, 0.0, true);
        drawAsianEye(ctx, eyeRightX, eyeY, 0.0, true);
        drawMouth(ctx, mouthX, mouthY, "happy");
        break;
    }

    ctx.restore();
  };

  for (let i = 0; i < 16; i++) {
    drawTile(i);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = LinearSRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.needsUpdate = true;

  return texture;
};
