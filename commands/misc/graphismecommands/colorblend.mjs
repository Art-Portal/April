import { AttachmentBuilder }  from "discord.js";
import Canvas  from "canvas";

export default {
    async execute(interaction){
        const color1 = interaction.options.getString('color1'); // Première couleur
        const color2 = interaction.options.getString('color2'); // Deuxième couleur
        const blendMode = interaction.options.getString('mode'); // Mode de fusion

        if (!isValidHexColor(color1) || !isValidHexColor(color2)) {
            interaction.reply({content: 'Les couleurs doivent être au format hexadécimal (ex. #FF0000).', ephermeral: true});
            return;
        }
        await interaction.deferReply();

        const blendedColor = blendColors(color1, color2, blendMode);

        const canvas = Canvas.createCanvas(99, 99);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, 33, 99);
        ctx.fillStyle = blendedColor;
        ctx.fillRect(33, 0, 66, 99);
        ctx.fillStyle = color2;
        ctx.fillRect(66, 0, 99, 99);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), {name: 'blended_color.png'});
        await interaction.editReply({content: `Couleur résultante du mélange (${blendMode}) : ${blendedColor}`, files: [attachment]});
    }
}


// Fonction pour vérifier si une chaîne est une couleur hexadécimale valide
function isValidHexColor(hexColor) {
    return /^#[0-9A-F]{6}$/i.test(hexColor);
}

// Fonction pour mélanger deux couleurs en fonction du mode de fusion
function blendColors(color1, color2, blendMode) {
    // Parsez les composants RVB des couleurs
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
  
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
  
    // Appliquez le mode de fusion et calculez la couleur résultante
    let blendedR, blendedG, blendedB;
    switch (blendMode) {
      case 'normal':
        blendedR = r1;
        blendedG = g1;
        blendedB = b1;
        break;
      case 'multiply':
        blendedR = (r1 * r2) / 255;
        blendedG = (g1 * g2) / 255;
        blendedB = (b1 * b2) / 255;
        break;
      case 'screen':
        blendedR = 255 - (255 - r1) * (255 - r2) / 255;
        blendedG = 255 - (255 - g1) * (255 - g2) / 255;
        blendedB = 255 - (255 - b1) * (255 - b2) / 255;
        break;
      case 'overlay':
        blendedR = r1 < 128 ? (2 * r1 * r2) / 255 : 255 - (2 * (255 - r1) * (255 - r2)) / 255;
        blendedG = g1 < 128 ? (2 * g1 * g2) / 255 : 255 - (2 * (255 - g1) * (255 - g2)) / 255;
        blendedB = b1 < 128 ? (2 * b1 * b2) / 255 : 255 - (2 * (255 - b1) * (255 - b2)) / 255;
        break;
      // Ajoutez d'autres modes de fusion ici
      default:
        blendedR = r1;
        blendedG = g1;
        blendedB = b1;
    }
  
    // Convertissez les composants RVB en une couleur hexadécimale
    const blendedColor = `#${componentToHex(Math.floor(blendedR))}${componentToHex(Math.floor(blendedG))}${componentToHex(Math.floor(blendedB))}`;
    return blendedColor;
}

// Fonction pour convertir un composant RVB en hexadécimal
function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}