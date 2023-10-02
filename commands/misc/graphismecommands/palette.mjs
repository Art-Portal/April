import Canvas  from "canvas";
import { AttachmentBuilder }  from 'discord.js';

export default {
    async execute(interaction){
        await interaction.deferReply();

        const palette = await generateRandomPalette();
        
        const imageBuffer = await createPaletteImage(palette);
    
        // Envoie l'image dans le canal où la commande a été appelée
        const attachment = new AttachmentBuilder(imageBuffer, { name: 'palette.png' });
        interaction.editReply({content: `Voici une proposition de palette :\n${palette.toString()}`, files: [attachment]});
    }
}

// Fonction pour générer une palette de couleurs harmonieuses
async function generateRandomPalette() {
    const numColors = Math.floor(Math.random() * 3) + 3; // Génère entre 3 et 5 couleurs
    const palette = [];

    // Générateur de couleurs harmonieuses (complémentaires)

    const baseColor = Math.floor(Math.random() * 16777215); // Couleur de base aléatoire
    
    for (let i = 0; i < numColors; i++) {
        // Random variations in saturation and brightness
        const hue = (baseColor + i * (360 / numColors)) % 360; // Répartition équilibrée des couleurs
        const saturation = Math.random() * 40 + 50; // Random saturation between 50% and 90%
        const brightness = Math.random() * 40 + 50; // Random brightness between 50% and 90%
    
        const color = hslToHex(hue + i * (360 / numColors) , saturation , brightness);
        palette.push(color);
    }

    return palette;
}

// Fonction pour créer une image représentant la palette de couleurs
async function createPaletteImage(colors) {
    const canvas = Canvas.createCanvas(colors.length * 40, 50);
    const ctx = canvas.getContext('2d');

    // Dessine les rectangles de couleur sur le canvas
    for (let i = 0; i < colors.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(i * 40, 0, 40, 50);
    }

    return canvas.toBuffer(); // Convertit le canvas en un buffer d'image
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
