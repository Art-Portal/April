import Canvas  from "canvas";
import { AttachmentBuilder }  from 'discord.js';

export default {
    async execute(interaction){
        const file = interaction.options.getAttachment('image');
        if(!file.contentType || !file.contentType.startsWith("image")) return interaction.reply({ content: "Merci d'envoyer une image", ephemeral: true });
        await interaction.deferReply();
        const filter = interaction.options.getString('filter');

        const canvas = Canvas.createCanvas(file.width, file.height);
        const ctx = canvas.getContext('2d');
    
        const image = await Canvas.loadImage(file.url);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        switch(filter){
            case 'invert':
                applyInvertEffect(ctx);
                break;
            case 'grayscale':
                applyGrayscaleEffect(ctx);
                break;
            case 'sepia':
                applySepiaEffect(ctx);
                break;
            case 'blur':
                applyBlurEffect(ctx);
                break;
            case 'pixelate':
                applyPixelateEffect(ctx);
                break;
            case 'mirror':
                applyMirrorEffect(ctx);
                break;
            case 'rotate':
                applyRotateEffect(ctx, image);
                break;
            case 'brightness':
                applyBrightnessEffect(ctx);
                break;
            case 'vintage':
                applyVintageEffect(ctx);
                break;
            case 'oilpaint':
                applyOilPaintEffect(ctx, 8, 8);
                break;
            case 'watercolor':
                applyWatercolorEffect(ctx);
                break;
            case 'neon':
                applyNeonEffect(ctx);
                break;
        }

        const remixedImageBuffer = canvas.toBuffer();
        const remixedImageAttachment = new AttachmentBuilder(remixedImageBuffer, {name: 'image.png'} );

        await interaction.editReply({content: `Voici l'image modifiée :`, files: [remixedImageAttachment]});
    }
}


// Fonction pour appliquer l'effet d'inversion des couleurs
function applyInvertEffect(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
  
    // Inversion des couleurs
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // Inversion du canal rouge
        data[i + 1] = 255 - data[i + 1]; // Inversion du canal vert
        data[i + 2] = 255 - data[i + 2]; // Inversion du canal bleu
    }
  
    ctx.putImageData(imageData, 0, 0);
}
  
// Fonction pour appliquer l'effet de conversion en niveaux de gris
function applyGrayscaleEffect(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
  
    // Conversion en niveaux de gris
    for (let i = 0; i < data.length; i += 4) {
        const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = average; // Rouge
        data[i + 1] = average; // Vert
        data[i + 2] = average; // Bleu
    }
  
    ctx.putImageData(imageData, 0, 0);
}

// Fonction pour appliquer l'effet de sépia
function applySepiaEffect(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
  
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
        data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
        data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
    }
  
    ctx.putImageData(imageData, 0, 0);
}
  
// Fonction pour appliquer l'effet de flou
function applyBlurEffect(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
  
    const blurRadius = 5;
  
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let red = 0;
            let green = 0;
            let blue = 0;
            let count = 0;

            for (let dy = -blurRadius; dy <= blurRadius; dy++) {
                for (let dx = -blurRadius; dx <= blurRadius; dx++) {
                    const nx = x + dx;
                    const ny = y + dy;

                    if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
                        const index = (ny * width + nx) * 4;
                        red += data[index];
                        green += data[index + 1];
                        blue += data[index + 2];
                        count++;
                    }
                }
            }

            const index = (y * width + x) * 4;
            data[index] = red / count;
            data[index + 1] = green / count;
            data[index + 2] = blue / count;
        }
    }
  
    ctx.putImageData(imageData, 0, 0);
}

// Fonction pour appliquer l'effet de pixelisation
function applyPixelateEffect(ctx) {
    const pixelSize = 10; // Taille des pixels
  
    for (let y = 0; y < ctx.canvas.height; y += pixelSize) {
        for (let x = 0; x < ctx.canvas.width; x += pixelSize) {
            const pixelColor = ctx.getImageData(x, y, pixelSize, pixelSize);

            ctx.fillStyle = `rgb(${pixelColor.data[0]}, ${pixelColor.data[1]}, ${pixelColor.data[2]})`;
            ctx.fillRect(x, y, pixelSize, pixelSize);
        }
    }
}

// Fonction pour appliquer l'effet de miroir horizontal
function applyMirrorEffect(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width / 2; x++) {
        const indexA = (y * width + x) * 4;
        const indexB = (y * width + (width - x - 1)) * 4;

        // Échangez les valeurs de pixel pour le miroir horizontal
        [data[indexA], data[indexB]] = [data[indexB], data[indexA]];
        [data[indexA + 1], data[indexB + 1]] = [data[indexB + 1], data[indexA + 1]];
        [data[indexA + 2], data[indexB + 2]] = [data[indexB + 2], data[indexA + 2]];
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

// Fonction pour appliquer l'effet de rotation
function applyRotateEffect(ctx, image) {
    ctx.save();
    ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
    ctx.rotate(90*Math.PI/180);
    ctx.drawImage(image,-image.width/2,-image.width/2);
    ctx.restore();
  }
  
// Fonction pour appliquer l'effet de luminosité
function applyBrightnessEffect(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;

    const brightnessFactor = 1.5; // Facteur de luminosité (ajustez selon vos préférences)

    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * brightnessFactor);
        data[i + 1] = Math.min(255, data[i + 1] * brightnessFactor);
        data[i + 2] = Math.min(255, data[i + 2] * brightnessFactor);
    }

    ctx.putImageData(imageData, 0, 0);
}

// Fonction pour appliquer l'effet vintage
function applyVintageEffect(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
  
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        data[i] = Math.min(255, r * 1.5);
        data[i + 1] = Math.min(255, g * 1.2);
        data[i + 2] = Math.min(255, b * 0.8);
    }
  
    ctx.putImageData(imageData, 0, 0);
}

// Fonction pour appliquer l'effet de peinture à l'huile (oil paint)
function applyOilPaintEffect(ctx, radius, intensity) {
    var width = ctx.canvas.width,
        height = ctx.canvas.height,
        imgData = ctx.getImageData(0, 0, width, height),
        pixData = imgData.data,
        pixelIntensityCount = [],
        destCanvas = ctx.canvas;

    destCanvas.width = width;
    destCanvas.height = height;
        
    var destImageData = ctx.createImageData(width, height),
        destPixData = destImageData.data,
        intensityLUT = [],
        rgbLUT = [];
    
    for (var y = 0; y < height; y++) {
        intensityLUT[y] = [];
        rgbLUT[y] = [];
        for (var x = 0; x < width; x++) {
            var idx = (y * width + x) * 4,
                r = pixData[idx],
                g = pixData[idx + 1],
                b = pixData[idx + 2],
                avg = (r + g + b) / 3;
            
            intensityLUT[y][x] = Math.round((avg * intensity) / 255);
            rgbLUT[y][x] = {
                r: r,
                g: g,
                b: b
            };
        }
    }
    
    
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            pixelIntensityCount = [];
            
            // Find intensities of nearest pixels within radius.
            for (var yy = -radius; yy <= radius; yy++) {
                for (var xx = -radius; xx <= radius; xx++) {
                    if (y + yy > 0 && y + yy < height && x + xx > 0 && x + xx < width) {
                        var intensityVal = intensityLUT[y + yy][x + xx];

                        if (!pixelIntensityCount[intensityVal]) {
                            pixelIntensityCount[intensityVal] = {
                                val: 1,
                                r: rgbLUT[y + yy][x + xx].r,
                                g: rgbLUT[y + yy][x + xx].g,
                                b: rgbLUT[y + yy][x + xx].b
                            }
                        } else {
                            pixelIntensityCount[intensityVal].val++;
                            pixelIntensityCount[intensityVal].r += rgbLUT[y + yy][x + xx].r;
                            pixelIntensityCount[intensityVal].g += rgbLUT[y + yy][x + xx].g;
                            pixelIntensityCount[intensityVal].b += rgbLUT[y + yy][x + xx].b;
                        }
                    }
                }
            }
            
            pixelIntensityCount.sort(function (a, b) {
                return b.val - a.val;
            });
            
            var curMax = pixelIntensityCount[0].val,
                dIdx = (y * width + x) * 4;
            
            destPixData[dIdx] = ~~ (pixelIntensityCount[0].r / curMax);
            destPixData[dIdx + 1] = ~~ (pixelIntensityCount[0].g / curMax);
            destPixData[dIdx + 2] = ~~ (pixelIntensityCount[0].b / curMax);
            destPixData[dIdx + 3] = 255;
        }
    }
    
    // change this to ctx to instead put the data on the original canvas
    ctx.putImageData(destImageData, 0, 0);
}

// Fonction pour appliquer l'effet aquarelle (watercolor)
function applyWatercolorEffect(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
  
    const radius = Math.floor(Math.random() * 10)+2;
  
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelIndex = (y * width + x) * 4;

            const randomX = x + Math.floor(Math.random() * (radius * 2 + 1)) - radius;
            const randomY = y + Math.floor(Math.random() * (radius * 2 + 1)) - radius;
            const neighborIndex = (randomY * width + randomX) * 4;

            // On copie un pixel voisin au hasard
            if (randomX >= 0 && randomX < width && randomY >= 0 && randomY < height) {
                data[pixelIndex] = data[neighborIndex];
                data[pixelIndex + 1] = data[neighborIndex + 1];
                data[pixelIndex + 2] = data[neighborIndex + 2];
            }
        }
    }
  
    ctx.putImageData(imageData, 0, 0);
}

// Fonction pour appliquer l'effet néon
function applyNeonEffect(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
  
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Augmentez la saturation des couleurs
        data[i] = r > 128 ? 255 : 0;
        data[i + 1] = g > 128 ? 255 : 0;
        data[i + 2] = b > 128 ? 255 : 0;
    }
  
    ctx.putImageData(imageData, 0, 0);
}