import { EmbedBuilder } from 'discord.js';
export default {
    async execute(interaction){
        const randomIndex = Math.floor(Math.random() * inspirations.length);
        const inspiration = inspirations[randomIndex];
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Inspiration')
                    .setColor('Random')
                    .setDescription(inspiration),
            ]
        })
    }
}

const inspirations = [
    '> « La créativité, c\'est l\'intelligence qui s\'amuse. » \n- Albert Einstein',
    'Astuce créative : Essayez de dessiner avec des couleurs opposées à celles que vous utilisez habituellement.',
    'Suggestion de couleur : Jaune soleil pour apporter de la chaleur à votre création ! 🌞',
    '> « L\'art ne reproduit pas le visible, il rend visible. » \n- Paul Klee',
    'Astuce créative : Utilisez des textures inattendues pour ajouter de la profondeur à votre œuvre.',
    'Suggestion de couleur : Vert émeraude pour une touche de fraîcheur ! 💚',
    '> « Chaque enfant est un artiste. Le problème est de rester un artiste lorsque vous grandissez. » \n- Pablo Picasso',
    'Astuce créative : Expérimentez avec des techniques mixtes pour des résultats uniques.',
    'Suggestion de couleur : Bleu ciel pour une ambiance paisible. ☁️',
    '> « L\'imagination est plus importante que le savoir. » \n- Albert Einstein',
    'Astuce créative : Sortez et dessinez en plein air pour capter l\'inspiration de la nature.',
    'Suggestion de couleur : Rouge passion pour une touche audacieuse ! ❤️',
    '> « La couleur est la touche. L\'œil est le marteau. L\'âme est le piano avec ses nombreuses cordes. » \n- Wassily Kandinsky',
    'Astuce créative : Utilisez des formes géométriques pour créer des motifs intéressants.',
    'Suggestion de couleur : Violet mystique pour une atmosphère envoûtante. 💜',
    '> « L\'art est le plus beau des mensonges. » \n- Claude Debussy',
    'Astuce créative : Trouvez de l\'inspiration dans la musique et traduisez-la en art visuel.',
    'Suggestion de couleur : Or brillant pour une touche de luxe ! ✨',
    '> « La meilleure façon de gagner du temps est de le perdre. » \n- Marguerite Duras ',
    'Astuce créative : Explorez des styles artistiques différents pour trouver votre propre voie.',
    'Suggestion de couleur : Argent métallique pour une touche moderne. 🌟',
    '> « La créativité est contagieuse, faites-la passer. » \n- Albert Einstein',
    'Astuce créative : Travaillez sur un projet collaboratif pour stimuler l\'inspiration.',
    'Suggestion de couleur : Turquoise apaisant pour une ambiance relaxante. 🐬',
];