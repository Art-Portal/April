const Canvas = require('canvas');
const { AttachmentBuilder } = require('discord.js')

module.exports = {
    async execute(interaction){
        const file = interaction.options.getAttachment('image');
        if(!file.contentType.startsWith("image")) return interaction.reply({ content: "Merci d'envoyer une image", ephemeral: true });
        await interaction.deferReply();
        const filter = interaction.options.getString('filter');

        const canvas = Canvas.createCanvas(500, 500);
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