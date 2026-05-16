import { Component, computed, signal, WritableSignal, EventEmitter, Output } from '@angular/core';
import { villagerNames } from '../island-create/island-create';
import { SupabaseService } from '../supabase.service';



@Component({
  selector: 'app-villagers',
  imports: [],
  templateUrl: './villagers.html',
  styleUrl: './villagers.css',
})
export class Villagers {
    private raw: Array<any> = [
        { en: 'Ace', fr: 'Ace', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '8/11', color1: 'Cyan', color2: 'Vert' },
        { en: 'Admiral', fr: 'Admiral', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '1/27', color1: 'Noir', color2: 'Bleu' },
        { en: 'Agent S', fr: 'Agent S', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '7/2', color1: 'Bleu', color2: 'Noir' },
        { en: 'Agnes', fr: 'Agnes', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '4/21', color1: 'Rose', color2: 'Blanc' },
        { en: 'Al', fr: 'Al', species_en: 'Gorilla', species_fr: 'Gorille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '10/18', color1: 'Rouge', color2: 'Blanc' },
        { en: 'Alfonso', fr: 'Alfonso', species_en: 'Alligator', species_fr: 'Alligator', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '6/9', color1: 'Rouge', color2: 'Bleu' },
        { en: 'Alice', fr: 'Alice', species_en: 'Koala', species_fr: 'Koala', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '8/19', color1: 'Rouge', color2: 'Rose' },
        { en: 'Alli', fr: 'Alli', species_en: 'Alligator', species_fr: 'Alligator', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '11/8', color1: 'Jaune', color2: 'Marron' },
        { en: 'Amelia', fr: 'Amelia', species_en: 'Eagle', species_fr: 'Aigle', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '11/19', color1: 'Noir', color2: 'Blanc' },
        { en: 'Anabelle', fr: 'Anabelle', species_en: 'Anteater', species_fr: 'Fourmilier', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '2/16', color1: 'Vert', color2: 'Bleu' },
        { en: 'Anchovy', fr: 'Anchovy', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '3/4', color1: 'Colorée', color2: 'Orange' },
        { en: 'Angus', fr: 'Angus', species_en: 'Bull', species_fr: 'Taureau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '4/30', color1: 'Rouge', color2: 'Noir' },
        { en: 'Anicotti', fr: 'Anicotti', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '2/24', color1: 'Rouge', color2: 'Rose' },
        { en: 'Ankha', fr: 'Ankha', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '9/22', color1: 'Colorée', color2: 'Marron' },
        { en: 'Annalisa', fr: 'Annalisa', species_en: 'Anteater', species_fr: 'Fourmilier', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '2/6', color1: 'Rouge', color2: 'Rose' },
        { en: 'Annalise', fr: 'Annalise', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '12/2', color1: 'Bleu', color2: 'Violet' },
        { en: 'Antonio', fr: 'Antonio', species_en: 'Anteater', species_fr: 'Fourmilier', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '10/20', color1: 'Cyan', color2: 'Bleu' },
        { en: 'Apollo', fr: 'Apollo', species_en: 'Eagle', species_fr: 'Aigle', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '7/4', color1: 'Noir', color2: 'Noir' },
        { en: 'Apple', fr: 'Apple', species_en: 'Hamster', species_fr: 'Hamster', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '9/24', color1: 'Colorée', color2: 'Rouge' },
        { en: 'Astrid', fr: 'Astrid', species_en: 'Kangaroo', species_fr: 'Kangaroo', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '9/8', color1: 'Noir', color2: 'Colorée' },
        { en: 'Audie', fr: 'Audie', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '8/31', color1: 'Vert', color2: 'Blanc' },
        { en: 'Aurora', fr: 'Aurora', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '1/27', color1: 'Rose', color2: 'Rouge' },
        { en: 'Ava', fr: 'Ava', species_en: 'Chicken', species_fr: 'Poulet', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '4/28', color1: 'Rouge', color2: 'Gris' },
        { en: 'Avery', fr: 'Avery', species_en: 'Eagle', species_fr: 'Aigle', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '2/22', color1: 'Orange', color2: 'Marron' },
        { en: 'Axel', fr: 'Axel', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '3/23', color1: 'Vert', color2: 'Blanc' },
        { en: 'Azalea', fr: 'Azalea', species_en: 'Rhinoceros', species_fr: 'Rhinoceros', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '12/18', color1: 'Violet', color2: 'Rose' },
        { en: 'Baabara', fr: 'Baabara', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '3/28', color1: 'Violet', color2: 'Bleu' },
        { en: 'Bam', fr: 'Bam', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '11/7', color1: 'Vert', color2: 'Marron' },
        { en: 'Bangle', fr: 'Bangle', species_en: 'Tiger', species_fr: 'Tigre', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '8/27', color1: 'Jaune', color2: 'Vert' },
        { en: 'Barold', fr: 'Barold', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '3/2', color1: 'Jaune', color2: 'Noir' },
        { en: 'Bea', fr: 'Bea', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '10/15', color1: 'Cyan', color2: 'Vert' },
        { en: 'Beardo', fr: 'Beardo', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '9/27', color1: 'Marron', color2: 'Bleu' },
        { en: 'Beau', fr: 'Beau', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '4/5', color1: 'Beige', color2: 'Orange' },
        { en: 'Becky', fr: 'Becky', species_en: 'Chicken', species_fr: 'Poulet', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '12/9', color1: 'Violet', color2: 'Rose' },
        { en: 'Bella', fr: 'Bella', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '12/28', color1: 'Noir', color2: 'Violet' },
        { en: 'Benedict', fr: 'Benedict', species_en: 'Chicken', species_fr: 'Poulet', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '10/10', color1: 'Bleu', color2: 'Violet' },
        { en: 'Benjamin', fr: 'Benjamin', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '8/3', color1: 'Rouge', color2: 'Blanc' },
        { en: 'Bertha', fr: 'Bertha', species_en: 'Hippo', species_fr: 'Hippo', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '4/25', color1: 'Rose', color2: 'Blanc' },
        { en: 'Bettina', fr: 'Bettina', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '6/12', color1: 'Blanc', color2: 'Rouge' },
        { en: 'Bianca', fr: 'Bianca', species_en: 'Tiger', species_fr: 'Tigre', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '12/13', color1: 'Rose', color2: 'Orange' },
        { en: 'Biff', fr: 'Biff', species_en: 'Hippo', species_fr: 'Hippo', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '3/29', color1: 'Noir', color2: 'Bleu' },
        { en: 'Big Top', fr: 'Big Top', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '10/3', color1: 'Vert', color2: 'Vert' },
        { en: 'Bill', fr: 'Bill', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '2/1', color1: 'Bleu', color2: 'Violet' },
        { en: 'Billy', fr: 'Billy', species_en: 'Goat', species_fr: 'Chèvre', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '3/25', color1: 'Bleu', color2: 'Violet' },
        { en: 'Biskit', fr: 'Biskit', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '5/13', color1: 'Violet', color2: 'Colorée' },
        { en: 'Bitty', fr: 'Bitty', species_en: 'Hippo', species_fr: 'Hippo', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/6', color1: 'Rose', color2: 'Orange' },
        { en: 'Blaire', fr: 'Blaire', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '7/3', color1: 'Orange', color2: 'Marron' },
        { en: 'Blanche', fr: 'Blanche', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '12/21', color1: 'Noir', color2: 'Marron' },
        { en: 'Bluebear', fr: 'Bluebear', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '6/24', color1: 'Blanc', color2: 'Bleu' },
        { en: 'Bob', fr: 'Bob', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '1/1', color1: 'Colorée', color2: 'Rouge' },
        { en: 'Bonbon', fr: 'Bonbon', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '3/3', color1: 'Cyan', color2: 'Jaune' },
        { en: 'Bones', fr: 'Bones', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '8/4', color1: 'Beige', color2: 'Marron' },
        { en: 'Boomer', fr: 'Boomer', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '2/7', color1: 'Marron', color2: 'Beige' },
        { en: 'Boone', fr: 'Boone', species_en: 'Gorilla', species_fr: 'Gorille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '9/12', color1: 'Colorée', color2: 'Rouge' },
        { en: 'Boots', fr: 'Boots', species_en: 'Alligator', species_fr: 'Alligator', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '8/7', color1: 'Colorée', color2: 'Violet' },
        { en: 'Boris', fr: 'Boris', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '11/6', color1: 'Violet', color2: 'Noir' },
        { en: 'Boyd', fr: 'Boyd', species_en: 'Gorilla', species_fr: 'Gorille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '10/1', color1: 'Rouge', color2: 'Noir' },
        { en: 'Bree', fr: 'Bree', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '7/7', color1: 'Noir', color2: 'Bleu' },
        { en: 'Broccolo', fr: 'Broccolo', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '6/30', color1: 'Colorée', color2: 'Jaune' },
        { en: 'Broffina', fr: 'Broffina', species_en: 'Chicken', species_fr: 'Poulet', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '10/24', color1: 'Noir', color2: 'Rouge' },
        { en: 'Bruce', fr: 'Bruce', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/26', color1: 'Noir', color2: 'Rouge' },
        { en: 'Bubbles', fr: 'Bubbles', species_en: 'Hippo', species_fr: 'Hippo', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '9/18', color1: 'Violet', color2: 'Rose' },
        { en: 'Buck', fr: 'Buck', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '4/4', color1: 'Gris', color2: 'Marron' },
        { en: 'Bud', fr: 'Bud', species_en: 'Lion', species_fr: 'Lion', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '8/8', color1: 'Vert', color2: 'Jaune' },
        { en: 'Bunnie', fr: 'Bunnie', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '5/9', color1: 'Vert', color2: 'Rose' },
        { en: 'Butch', fr: 'Butch', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '11/1', color1: 'Bleu', color2: 'Gris' },
        { en: 'Buzz', fr: 'Buzz', species_en: 'Eagle', species_fr: 'Aigle', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '12/7', color1: 'Jaune', color2: 'Rouge' },
        { en: 'Cally', fr: 'Cally', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '9/4', color1: 'Rouge', color2: 'Vert' },
        { en: 'Camofrog', fr: 'Camofrog', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/5', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Canberra', fr: 'Canberra', species_en: 'Koala', species_fr: 'Koala', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '5/14', color1: 'Vert', color2: 'Cyan' },
        { en: 'Candi', fr: 'Candi', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '4/13', color1: 'Cyan', color2: 'Jaune' },
        { en: 'Carmen', fr: 'Carmen', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '1/6', color1: 'Vert', color2: 'Beige' },
        { en: 'Caroline', fr: 'Caroline', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '7/15', color1: 'Colorée', color2: 'Blanc' },
        { en: 'Carrie', fr: 'Carrie', species_en: 'Kangaroo', species_fr: 'Kangaroo', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '12/5', color1: 'Rouge', color2: 'Colorée' },
        { en: 'Cashmere', fr: 'Cashmere', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '4/2', color1: 'Violet', color2: 'Beige' },
        { en: 'Cece', fr: 'Cece', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '5/28', color1: 'Bleu', color2: 'Noir' },
        { en: 'Celia', fr: 'Celia', species_en: 'Eagle', species_fr: 'Aigle', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '3/25', color1: 'Rose', color2: 'Vert' },
        { en: 'Cephalobot', fr: 'Cephalobot', species_en: 'Octopus', species_fr: 'Poulpe', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '4/1', color1: 'Noir', color2: 'Blanc' },
        { en: 'Cesar', fr: 'Cesar', species_en: 'Gorilla', species_fr: 'Gorille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '9/6', color1: 'Bleu', color2: 'Cyan' },
        { en: 'Chabwick', fr: 'Chabwick', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '12/24', color1: 'Jaune', color2: 'Gris' },
        { en: 'Chadder', fr: 'Chadder', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '12/15', color1: 'Noir', color2: 'Gris' },
        { en: 'Chai', fr: 'Chai', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '3/6', color1: 'Bleu', color2: 'Cyan' },
        { en: 'Charlise', fr: 'Charlise', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '4/17', color1: 'Rouge', color2: 'Orange' },
        { en: 'Chelsea', fr: 'Chelsea', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '1/18', color1: 'Rose', color2: 'Blanc' },
        { en: 'Cheri', fr: 'Cheri', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '3/17', color1: 'Jaune', color2: 'Cyan' },
        { en: 'Cherry', fr: 'Cherry', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '5/11', color1: 'Noir', color2: 'Violet' },
        { en: 'Chester', fr: 'Chester', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '8/6', color1: 'Jaune', color2: 'Vert' },
        { en: 'Chevre', fr: 'Chevre', species_en: 'Goat', species_fr: 'Chèvre', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '3/6', color1: 'Rouge', color2: 'Rose' },
        { en: 'Chief', fr: 'Chief', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '12/19', color1: 'Blanc', color2: 'Gris' },
        { en: 'Chops', fr: 'Chops', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/13', color1: 'Rouge', color2: 'Vert' },
        { en: 'Chow', fr: 'Chow', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '7/22', color1: 'Noir', color2: 'Blanc' },
        { en: 'Chrissy', fr: 'Chrissy', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '8/28', color1: 'Rose', color2: 'Blanc' },
        { en: 'Claude', fr: 'Claude', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '12/3', color1: 'Noir', color2: 'Colorée' },
        { en: 'Claudia', fr: 'Claudia', species_en: 'Tiger', species_fr: 'Tigre', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '11/22', color1: 'Violet', color2: 'Blanc' },
        { en: 'Clay', fr: 'Clay', species_en: 'Hamster', species_fr: 'Hamster', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '10/19', color1: 'Beige', color2: 'Marron' },
        { en: 'Cleo', fr: 'Cleo', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '2/9', color1: 'Cyan', color2: 'Blanc' },
        { en: 'Clyde', fr: 'Clyde', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '5/1', color1: 'Vert', color2: 'Blanc' },
        { en: 'Coach', fr: 'Coach', species_en: 'Bull', species_fr: 'Taureau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '4/29', color1: 'Bleu', color2: 'Rouge' },
        { en: 'Cobb', fr: 'Cobb', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/7', color1: 'Blanc', color2: 'Bleu' },
        { en: 'Coco', fr: 'Coco', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '3/1', color1: 'Beige', color2: 'Vert' },
        { en: 'Cole', fr: 'Cole', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '8/10', color1: 'Orange', color2: 'Colorée' },
        { en: 'Colton', fr: 'Colton', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/22', color1: 'Bleu', color2: 'Rouge' },
        { en: 'Cookie', fr: 'Cookie', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '6/18', color1: 'Vert', color2: 'Cyan' },
        { en: 'Cousteau', fr: 'Cousteau', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '12/17', color1: 'Vert', color2: 'Rouge' },
        { en: 'Cranston', fr: 'Cranston', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '9/23', color1: 'Beige', color2: 'Marron' },
        { en: 'Croque', fr: 'Croque', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '7/18', color1: 'Rouge', color2: 'Orange' },
        { en: 'Cube', fr: 'Cube', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '1/29', color1: 'Jaune', color2: 'Colorée' },
        { en: 'Curlos', fr: 'Curlos', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/8', color1: 'Rouge', color2: 'Vert' },
        { en: 'Curly', fr: 'Curly', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '7/26', color1: 'Jaune', color2: 'Colorée' },
        { en: 'Curt', fr: 'Curt', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '7/1', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Cyd', fr: 'Cyd', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/9', color1: 'Noir', color2: 'Jaune' },
        { en: 'Cyrano', fr: 'Cyrano', species_en: 'Anteater', species_fr: 'Fourmilier', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '3/9', color1: 'Jaune', color2: 'Beige' },
        { en: 'Daisy', fr: 'Daisy', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '11/16', color1: 'Colorée', color2: 'Bleu' },
        { en: 'Deena', fr: 'Deena', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '6/27', color1: 'Colorée', color2: 'Bleu' },
        { en: 'Deirdre', fr: 'Deirdre', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '5/4', color1: 'Orange', color2: 'Orange' },
        { en: 'Del', fr: 'Del', species_en: 'Alligator', species_fr: 'Alligator', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '5/27', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Deli', fr: 'Deli', species_en: 'Monkey', species_fr: 'Singe', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/24', color1: 'Violet', color2: 'Marron' },
        { en: 'Derwin', fr: 'Derwin', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '5/25', color1: 'Jaune', color2: 'Beige' },
        { en: 'Diana', fr: 'Diana', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '1/4', color1: 'Violet', color2: 'Rose' },
        { en: 'Diva', fr: 'Diva', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '10/2', color1: 'Violet', color2: 'Cyan' },
        { en: 'Dizzy', fr: 'Dizzy', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '7/14', color1: 'Jaune', color2: 'Bleu' },
        { en: 'Dobie', fr: 'Dobie', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '2/17', color1: 'Marron', color2: 'Beige' },
        { en: 'Doc', fr: 'Doc', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '3/16', color1: 'Gris', color2: 'Beige' },
        { en: 'Dom', fr: 'Dom', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '3/18', color1: 'Rouge', color2: 'Colorée' },
        { en: 'Dora', fr: 'Dora', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '2/18', color1: 'Bleu', color2: 'Cyan' },
        { en: 'Dotty', fr: 'Dotty', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '3/14', color1: 'Bleu', color2: 'Noir' },
        { en: 'Drago', fr: 'Drago', species_en: 'Alligator', species_fr: 'Alligator', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '2/12', color1: 'Orange', color2: 'Rouge' },
        { en: 'Drake', fr: 'Drake', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '6/25', color1: 'Marron', color2: 'Rouge' },
        { en: 'Drift', fr: 'Drift', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '10/9', color1: 'Orange', color2: 'Rouge' },
        { en: 'Ed', fr: 'Ed', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '9/16', color1: 'Noir', color2: 'Gris' },
        { en: 'Egbert', fr: 'Egbert', species_en: 'Chicken', species_fr: 'Poulet', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '10/14', color1: 'Beige', color2: 'Marron' },
        { en: 'Elise', fr: 'Elise', species_en: 'Monkey', species_fr: 'Singe', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '3/21', color1: 'Violet', color2: 'Rouge' },
        { en: 'Ellie', fr: 'Ellie', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/12', color1: 'Gris', color2: 'Rose' },
        { en: 'Elmer', fr: 'Elmer', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '10/5', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Eloise', fr: 'Eloise', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '12/8', color1: 'Vert', color2: 'Orange' },
        { en: 'Elvis', fr: 'Elvis', species_en: 'Lion', species_fr: 'Lion', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '7/23', color1: 'Rouge', color2: 'Noir' },
        { en: 'Erik', fr: 'Erik', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '7/27', color1: 'Beige', color2: 'Rouge' },
        { en: 'Étoile', fr: 'Étoile', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '12/25', color1: 'Cyan', color2: 'Rose' },
        { en: 'Eugene', fr: 'Eugene', species_en: 'Koala', species_fr: 'Koala', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '10/26', color1: 'Noir', color2: 'Gris' },
        { en: 'Eunice', fr: 'Eunice', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '4/3', color1: 'Beige', color2: 'Orange' },
        { en: 'Faith', fr: 'Faith', species_en: 'Koala', species_fr: 'Koala', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '3/21', color1: 'Rouge', color2: 'Blanc' },
        { en: 'Fang', fr: 'Fang', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '12/18', color1: 'Blanc', color2: 'Cyan' },
        { en: 'Fauna', fr: 'Fauna', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '3/26', color1: 'Beige', color2: 'Blanc' },
        { en: 'Felicity', fr: 'Felicity', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '3/30', color1: 'Jaune', color2: 'Orange' },
        { en: 'Filbert', fr: 'Filbert', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '6/3', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Flip', fr: 'Flip', species_en: 'Monkey', species_fr: 'Singe', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '11/21', color1: 'Bleu', color2: 'Jaune' },
        { en: 'Flo', fr: 'Flo', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '9/2', color1: 'Rouge', color2: 'Violet' },
        { en: 'Flora', fr: 'Flora', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '2/9', color1: 'Colorée', color2: 'Rose' },
        { en: 'Flurry', fr: 'Flurry', species_en: 'Hamster', species_fr: 'Hamster', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '1/30', color1: 'Rouge', color2: 'Rose' },
        { en: 'Francine', fr: 'Francine', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '1/22', color1: 'Bleu', color2: 'Noir' },
        { en: 'Frank', fr: 'Frank', species_en: 'Eagle', species_fr: 'Aigle', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '7/30', color1: 'Marron', color2: 'Jaune' },
        { en: 'Freckles', fr: 'Freckles', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '2/19', color1: 'Vert', color2: 'Colorée' },
        { en: 'Frett', fr: 'Frett', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '10/30', color1: 'Gris', color2: 'Marron' },
        { en: 'Freya', fr: 'Freya', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '12/14', color1: 'Vert', color2: 'Bleu' },
        { en: 'Friga', fr: 'Friga', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '10/16', color1: 'Rose', color2: 'Noir' },
        { en: 'Frita', fr: 'Frita', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '7/16', color1: 'Jaune', color2: 'Rouge' },
        { en: 'Frobert', fr: 'Frobert', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '2/8', color1: 'Bleu', color2: 'Colorée' },
        { en: 'Fuchsia', fr: 'Fuchsia', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '9/19', color1: 'Rose', color2: 'Rose' },
        { en: 'Gabi', fr: 'Gabi', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '12/16', color1: 'Marron', color2: 'Rouge' },
        { en: 'Gala', fr: 'Gala', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '3/5', color1: 'Rose', color2: 'Blanc' },
        { en: 'Gaston', fr: 'Gaston', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/28', color1: 'Marron', color2: 'Orange' },
        { en: 'Gayle', fr: 'Gayle', species_en: 'Alligator', species_fr: 'Alligator', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/17', color1: 'Rose', color2: 'Blanc' },
        { en: 'Genji', fr: 'Genji', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '1/21', color1: 'Vert', color2: 'Violet' },
        { en: 'Gigi', fr: 'Gigi', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '8/11', color1: 'Noir', color2: 'Blanc' },
        { en: 'Gladys', fr: 'Gladys', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '1/15', color1: 'Vert', color2: 'Rose' },
        { en: 'Gloria', fr: 'Gloria', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '8/12', color1: 'Noir', color2: 'Gris' },
        { en: 'Goldie', fr: 'Goldie', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '12/27', color1: 'Jaune', color2: 'Orange' },
        { en: 'Gonzo', fr: 'Gonzo', species_en: 'Koala', species_fr: 'Koala', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '10/13', color1: 'Noir', color2: 'Vert' },
        { en: 'Goose', fr: 'Goose', species_en: 'Chicken', species_fr: 'Poulet', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '10/4', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Graham', fr: 'Graham', species_en: 'Hamster', species_fr: 'Hamster', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '6/20', color1: 'Vert', color2: 'Orange' },
        { en: 'Greta', fr: 'Greta', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '9/5', color1: 'Rose', color2: 'Violet' },
        { en: 'Grizzly', fr: 'Grizzly', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '7/31', color1: 'Rouge', color2: 'Noir' },
        { en: 'Groucho', fr: 'Groucho', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '10/23', color1: 'Noir', color2: 'Gris' },
        { en: 'Gruff', fr: 'Gruff', species_en: 'Goat', species_fr: 'Chèvre', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '8/29', color1: 'Violet', color2: 'Noir' },
        { en: 'Gwen', fr: 'Gwen', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '1/23', color1: 'Vert', color2: 'Blanc' },
        { en: 'Hamlet', fr: 'Hamlet', species_en: 'Hamster', species_fr: 'Hamster', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '5/30', color1: 'Violet', color2: 'Bleu' },
        { en: 'Hamphrey', fr: 'Hamphrey', species_en: 'Hamster', species_fr: 'Hamster', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '2/25', color1: 'Gris', color2: 'Beige' },
        { en: 'Hans', fr: 'Hans', species_en: 'Gorilla', species_fr: 'Gorille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '12/5', color1: 'Gris', color2: 'Bleu' },
        { en: 'Harry', fr: 'Harry', species_en: 'Hippo', species_fr: 'Hippo', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '1/7', color1: 'Vert', color2: 'Orange' },
        { en: 'Hazel', fr: 'Hazel', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '8/30', color1: 'Rouge', color2: 'Jaune' },
        { en: 'Henry', fr: 'Henry', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '9/21', color1: 'Cyan', color2: 'Bleu' },
        { en: 'Hippeux', fr: 'Hippeux', species_en: 'Hippo', species_fr: 'Hippo', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/15', color1: 'Marron', color2: 'Vert' },
        { en: 'Hopkins', fr: 'Hopkins', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '3/11', color1: 'Bleu', color2: 'Jaune' },
        { en: 'Hopper', fr: 'Hopper', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '4/6', color1: 'Jaune', color2: 'Rouge' },
        { en: 'Hornsby', fr: 'Hornsby', species_en: 'Rhinoceros', species_fr: 'Rhinoceros', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '3/20', color1: 'Vert', color2: 'Marron' },
        { en: 'Huck', fr: 'Huck', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '7/9', color1: 'Vert', color2: 'Jaune' },
        { en: 'Hugh', fr: 'Hugh', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '12/30', color1: 'Beige', color2: 'Jaune' },
        { en: 'Iggly', fr: 'Iggly', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '11/2', color1: 'Rouge', color2: 'Bleu' },
        { en: 'Ike', fr: 'Ike', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/16', color1: 'Vert', color2: 'Bleu' },
        { en: 'Ione', fr: 'Ione', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '9/11', color1: 'Blanc', color2: 'Noir' },
        { en: 'Jacob', fr: 'Jacob', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '8/24', color1: 'Vert', color2: 'Rouge' },
        { en: 'Jacques', fr: 'Jacques', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/22', color1: 'Vert', color2: 'Noir' },
        { en: 'Jambette', fr: 'Jambette', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '10/27', color1: 'Marron', color2: 'Marron' },
        { en: 'Jay', fr: 'Jay', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '7/17', color1: 'Bleu', color2: 'Cyan' },
        { en: 'Jeremiah', fr: 'Jeremiah', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '7/8', color1: 'Orange', color2: 'Jaune' },
        { en: 'Jitters', fr: 'Jitters', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '2/2', color1: 'Jaune', color2: 'Orange' },
        { en: 'Joey', fr: 'Joey', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '1/3', color1: 'Vert', color2: 'Bleu' },
        { en: 'Judy', fr: 'Judy', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '3/10', color1: 'Rose', color2: 'Blanc' },
        { en: 'Julia', fr: 'Julia', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '7/31', color1: 'Violet', color2: 'Rouge' },
        { en: 'Julian', fr: 'Julian', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '3/15', color1: 'Violet', color2: 'Bleu' },
        { en: 'June', fr: 'June', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/21', color1: 'Blanc', color2: 'Rouge' },
        { en: 'Kabuki', fr: 'Kabuki', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '11/29', color1: 'Violet', color2: 'Rouge' },
        { en: 'Katt', fr: 'Katt', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '4/27', color1: 'Violet', color2: 'Noir' },
        { en: 'Keaton', fr: 'Keaton', species_en: 'Eagle', species_fr: 'Aigle', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/1', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Ken', fr: 'Ken', species_en: 'Chicken', species_fr: 'Poulet', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '12/23', color1: 'Violet', color2: 'Bleu' },
        { en: 'Ketchup', fr: 'Ketchup', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '7/27', color1: 'Cyan', color2: 'Blanc' },
        { en: 'Kevin', fr: 'Kevin', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '4/26', color1: 'Noir', color2: 'Rouge' },
        { en: 'Kid Cat', fr: 'Kid Cat', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '8/1', color1: 'Rouge', color2: 'Rouge' },
        { en: 'Kidd', fr: 'Kidd', species_en: 'Goat', species_fr: 'Chèvre', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '6/28', color1: 'Gris', color2: 'Blanc' },
        { en: 'Kiki', fr: 'Kiki', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/8', color1: 'Marron', color2: 'Beige' },
        { en: 'Kitt', fr: 'Kitt', species_en: 'Kangaroo', species_fr: 'Kangaroo', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/11', color1: 'Violet', color2: 'Rouge' },
        { en: 'Kitty', fr: 'Kitty', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '2/15', color1: 'Vert', color2: 'Gris' },
        { en: 'Klaus', fr: 'Klaus', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '3/31', color1: 'Gris', color2: 'Blanc' },
        { en: 'Knox', fr: 'Knox', species_en: 'Chicken', species_fr: 'Poulet', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '11/23', color1: 'Marron', color2: 'Rouge' },
        { en: 'Kody', fr: 'Kody', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '9/28', color1: 'Colorée', color2: 'Blanc' },
        { en: 'Kyle', fr: 'Kyle', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '12/6', color1: 'Noir', color2: 'Blanc' },
        { en: 'Leonardo', fr: 'Leonardo', species_en: 'Tiger', species_fr: 'Tigre', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '5/15', color1: 'Rouge', color2: 'Bleu' },
        { en: 'Leopold', fr: 'Leopold', species_en: 'Lion', species_fr: 'Lion', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '8/14', color1: 'Violet', color2: 'Vert' },
        { en: 'Lily', fr: 'Lily', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '2/4', color1: 'Blanc', color2: 'Jaune' },
        { en: 'Limberg', fr: 'Limberg', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/17', color1: 'Vert', color2: 'Bleu' },
        { en: 'Lionel', fr: 'Lionel', species_en: 'Lion', species_fr: 'Lion', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '7/29', color1: 'Vert', color2: 'Gris' },
        { en: 'Lobo', fr: 'Lobo', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '11/5', color1: 'Noir', color2: 'Beige' },
        { en: 'Lolly', fr: 'Lolly', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '3/27', color1: 'Gris', color2: 'Rose' },
        { en: 'Lopez', fr: 'Lopez', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '8/20', color1: 'Gris', color2: 'Gris' },
        { en: 'Louie', fr: 'Louie', species_en: 'Gorilla', species_fr: 'Gorille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '3/26', color1: 'Gris', color2: 'Rouge' },
        { en: 'Lucha', fr: 'Lucha', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '12/12', color1: 'Noir', color2: 'Gris' },
        { en: 'Lucky', fr: 'Lucky', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '11/4', color1: 'Beige', color2: 'Blanc' },
        { en: 'Lucy', fr: 'Lucy', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/2', color1: 'Rose', color2: 'Rouge' },
        { en: 'Lyman', fr: 'Lyman', species_en: 'Koala', species_fr: 'Koala', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '10/12', color1: 'Cyan', color2: 'Jaune' },
        { en: 'Mac', fr: 'Mac', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '11/11', color1: 'Rouge', color2: 'Noir' },
        { en: 'Maddie', fr: 'Maddie', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '1/11', color1: 'Violet', color2: 'Rose' },
        { en: 'Maelle', fr: 'Maelle', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '4/8', color1: 'Rose', color2: 'Blanc' },
        { en: 'Maggie', fr: 'Maggie', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '9/3', color1: 'Vert', color2: 'Jaune' },
        { en: 'Mallary', fr: 'Mallary', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '11/17', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Maple', fr: 'Maple', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '6/15', color1: 'Beige', color2: 'Vert' },
        { en: 'Marcel', fr: 'Marcel', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '12/31', color1: 'Vert', color2: 'Bleu' },
        { en: 'Marcie', fr: 'Marcie', species_en: 'Kangaroo', species_fr: 'Kangaroo', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/31', color1: 'Rose', color2: 'Beige' },
        { en: 'Margie', fr: 'Margie', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '1/28', color1: 'Rose', color2: 'Rouge' },
        { en: 'Marina', fr: 'Marina', species_en: 'Octopus', species_fr: 'Poulpe', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/26', color1: 'Rose', color2: 'Rouge' },
        { en: 'Marlo', fr: 'Marlo', species_en: 'Hamster', species_fr: 'Hamster', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '6/26', color1: 'Noir', color2: 'Marron' },
        { en: 'Marshal', fr: 'Marshal', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '9/29', color1: 'Cyan', color2: 'Bleu' },
        { en: 'Marty', fr: 'Marty', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '4/16', color1: 'Marron', color2: 'Jaune' },
        { en: 'Mathilda', fr: 'Mathilda', species_en: 'Kangaroo', species_fr: 'Kangaroo', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '11/12', color1: 'Blanc', color2: 'Rouge' },
        { en: 'Megan', fr: 'Megan', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '3/13', color1: 'Jaune', color2: 'Cyan' },
        { en: 'Melba', fr: 'Melba', species_en: 'Koala', species_fr: 'Koala', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '4/12', color1: 'Blanc', color2: 'Vert' },
        { en: 'Merengue', fr: 'Merengue', species_en: 'Rhinoceros', species_fr: 'Rhinoceros', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '3/19', color1: 'Blanc', color2: 'Rouge' },
        { en: 'Merry', fr: 'Merry', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '6/29', color1: 'Rose', color2: 'Cyan' },
        { en: 'Midge', fr: 'Midge', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '3/12', color1: 'Rose', color2: 'Rose' },
        { en: 'Mineru', fr: 'Mineru', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '5/12', color1: 'Violet', color2: 'Vert' },
        { en: 'Mint', fr: 'Mint', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '5/2', color1: 'Rose', color2: 'Violet' },
        { en: 'Mira', fr: 'Mira', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '7/6', color1: 'Rouge', color2: 'Jaune' },
        { en: 'Miranda', fr: 'Miranda', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '4/23', color1: 'Bleu', color2: 'Violet' },
        { en: 'Mitzi', fr: 'Mitzi', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '9/25', color1: 'Marron', color2: 'Beige' },
        { en: 'Moe', fr: 'Moe', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '1/12', color1: 'Noir', color2: 'Gris' },
        { en: 'Molly', fr: 'Molly', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '3/7', color1: 'Jaune', color2: 'Rose' },
        { en: 'Monique', fr: 'Monique', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '9/30', color1: 'Violet', color2: 'Rose' },
        { en: 'Monty', fr: 'Monty', species_en: 'Monkey', species_fr: 'Singe', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '12/7', color1: 'Jaune', color2: 'Gris' },
        { en: 'Moose', fr: 'Moose', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '9/13', color1: 'Violet', color2: 'Rouge' },
        { en: 'Mott', fr: 'Mott', species_en: 'Lion', species_fr: 'Lion', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '7/10', color1: 'Bleu', color2: 'Vert' },
        { en: 'Muffy', fr: 'Muffy', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '2/14', color1: 'Noir', color2: 'Violet' },
        { en: 'Murphy', fr: 'Murphy', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '12/29', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Nan', fr: 'Nan', species_en: 'Goat', species_fr: 'Chèvre', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '8/24', color1: 'Orange', color2: 'Jaune' },
        { en: 'Nana', fr: 'Nana', species_en: 'Monkey', species_fr: 'Singe', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '8/23', color1: 'Rose', color2: 'Blanc' },
        { en: 'Naomi', fr: 'Naomi', species_en: 'Cow', species_fr: 'Vâche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '2/28', color1: 'Colorée', color2: 'Violet' },
        { en: 'Nate', fr: 'Nate', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '8/16', color1: 'Blanc', color2: 'Vert' },
        { en: 'Nibbles', fr: 'Nibbles', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '7/19', color1: 'Rouge', color2: 'Jaune' },
        { en: 'Norma', fr: 'Norma', species_en: 'Cow', species_fr: 'Vâche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '9/20', color1: 'Blanc', color2: 'Cyan' },
        { en: 'O\'Hare', fr: 'O\'Hare', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '7/24', color1: 'Bleu', color2: 'Cyan' },
        { en: 'Octavian', fr: 'Octavian', species_en: 'Octopus', species_fr: 'Poulpe', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '9/20', color1: 'Noir', color2: 'Blanc' },
        { en: 'Olaf', fr: 'Olaf', species_en: 'Anteater', species_fr: 'Fourmilier', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '5/19', color1: 'Rouge', color2: 'Noir' },
        { en: 'Olive', fr: 'Olive', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '7/12', color1: 'Marron', color2: 'Jaune' },
        { en: 'Olivia', fr: 'Olivia', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '2/3', color1: 'Blanc', color2: 'Noir' },
        { en: 'Opal', fr: 'Opal', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '1/20', color1: 'Noir', color2: 'Orange' },
        { en: 'Ozzie', fr: 'Ozzie', species_en: 'Koala', species_fr: 'Koala', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '5/7', color1: 'Jaune', color2: 'Orange' },
        { en: 'Pancetti', fr: 'Pancetti', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '11/14', color1: 'Rouge', color2: 'Jaune' },
        { en: 'Pango', fr: 'Pango', species_en: 'Anteater', species_fr: 'Fourmilier', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '11/9', color1: 'Orange', color2: 'Violet' },
        { en: 'Paolo', fr: 'Paolo', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/5', color1: 'Gris', color2: 'Cyan' },
        { en: 'Papi', fr: 'Papi', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '1/10', color1: 'Orange', color2: 'Cyan' },
        { en: 'Pashmina', fr: 'Pashmina', species_en: 'Goat', species_fr: 'Chèvre', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '12/26', color1: 'Rouge', color2: 'Colorée' },
        { en: 'Pate', fr: 'Pate', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '2/23', color1: 'Jaune', color2: 'Blanc' },
        { en: 'Patty', fr: 'Patty', species_en: 'Cow', species_fr: 'Vâche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '5/10', color1: 'Orange', color2: 'Rouge' },
        { en: 'Paula', fr: 'Paula', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '3/22', color1: 'Orange', color2: 'Vert' },
        { en: 'Peaches', fr: 'Peaches', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '11/28', color1: 'Colorée', color2: 'Cyan' },
        { en: 'Peanut', fr: 'Peanut', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '6/8', color1: 'Rouge', color2: 'Colorée' },
        { en: 'Pecan', fr: 'Pecan', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '9/10', color1: 'Violet', color2: 'Beige' },
        { en: 'Peck', fr: 'Peck', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '7/25', color1: 'Beige', color2: 'Rouge' },
        { en: 'Peewee', fr: 'Peewee', species_en: 'Gorilla', species_fr: 'Gorille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '9/11', color1: 'Orange', color2: 'Bleu' },
        { en: 'Peggy', fr: 'Peggy', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '5/23', color1: 'Bleu', color2: 'Rouge' },
        { en: 'Pekoe', fr: 'Pekoe', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/18', color1: 'Rouge', color2: 'Beige' },
        { en: 'Penelope', fr: 'Penelope', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '2/5', color1: 'Rose', color2: 'Rouge' },
        { en: 'Petri', fr: 'Petri', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/23', color1: 'Blanc', color2: 'Gris' },
        { en: 'Phil', fr: 'Phil', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '11/27', color1: 'Vert', color2: 'Rouge' },
        { en: 'Phoebe', fr: 'Phoebe', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '4/22', color1: 'Noir', color2: 'Rouge' },
        { en: 'Pierce', fr: 'Pierce', species_en: 'Eagle', species_fr: 'Aigle', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '1/8', color1: 'Orange', color2: 'Jaune' },
        { en: 'Pietro', fr: 'Pietro', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '4/19', color1: 'Colorée', color2: 'Rouge' },
        { en: 'Rosey', fr: 'Rosey', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '9/9', color1: 'Rouge', color2: 'Rose' },
        { en: 'Piper', fr: 'Piper', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '4/18', color1: 'Noir', color2: 'Blanc' },
        { en: 'Pippy', fr: 'Pippy', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '6/14', color1: 'Vert', color2: 'Marron' },
        { en: 'Plucky', fr: 'Plucky', species_en: 'Chicken', species_fr: 'Poulet', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '10/12', color1: 'Cyan', color2: 'Jaune' },
        { en: 'Pompom', fr: 'Pompom', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '2/11', color1: 'Rose', color2: 'Cyan' },
        { en: 'Poncho', fr: 'Poncho', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '1/2', color1: 'Orange', color2: 'Jaune' },
        { en: 'Poppy', fr: 'Poppy', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '8/5', color1: 'Vert', color2: 'Jaune' },
        { en: 'Portia', fr: 'Portia', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '10/25', color1: 'Violet', color2: 'Noir' },
        { en: 'Prince', fr: 'Prince', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '7/21', color1: 'Jaune', color2: 'Blanc' },
        { en: 'Puck', fr: 'Puck', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '2/21', color1: 'Bleu', color2: 'Rouge' },
        { en: 'Puddles', fr: 'Puddles', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '1/13', color1: 'Vert', color2: 'Rose' },
        { en: 'Pudge', fr: 'Pudge', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '6/11', color1: 'Vert', color2: 'Bleu' },
        { en: 'Punchy', fr: 'Punchy', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '4/11', color1: 'Bleu', color2: 'Cyan' },
        { en: 'Purrl', fr: 'Purrl', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '5/29', color1: 'Gris', color2: 'Bleu' },
        { en: 'Queenie', fr: 'Queenie', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '11/13', color1: 'Noir', color2: 'Gris' },
        { en: 'Quillson', fr: 'Quillson', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '12/22', color1: 'Beige', color2: 'Orange' },
        { en: 'Quinn', fr: 'Quinn', species_en: 'Eagle', species_fr: 'Aigle', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '1/20', color1: 'Noir', color2: 'Blanc' },
        { en: 'Raddle', fr: 'Raddle', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '6/6', color1: 'Blanc', color2: 'Gris' },
        { en: 'Rasher', fr: 'Rasher', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '4/7', color1: 'Bleu', color2: 'Noir' },
        { en: 'Raymond', fr: 'Raymond', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '10/1', color1: 'Noir', color2: 'Gris' },
        { en: 'Renée', fr: 'Renée', species_en: 'Rhinoceros', species_fr: 'Rhinoceros', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '5/28', color1: 'Violet', color2: 'Jaune' },
        { en: 'Reneigh', fr: 'Reneigh', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '6/4', color1: 'Noir', color2: 'Violet' },
        { en: 'Rex', fr: 'Rex', species_en: 'Lion', species_fr: 'Lion', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '7/24', color1: 'Bleu', color2: 'Cyan' },
        { en: 'Rhonda', fr: 'Rhonda', species_en: 'Rhinoceros', species_fr: 'Rhinoceros', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '1/24', color1: 'Violet', color2: 'Noir' },
        { en: 'Ribbot', fr: 'Ribbot', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '2/13', color1: 'Bleu', color2: 'Cyan' },
        { en: 'Ricky', fr: 'Ricky', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '9/14', color1: 'Bleu', color2: 'Rouge' },
        { en: 'Rilla', fr: 'Rilla', species_en: 'Gorilla', species_fr: 'Gorille', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '11/1', color1: 'Rouge', color2: 'Bleu' },
        { en: 'Rio', fr: 'Rio', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '9/10', color1: 'Orange', color2: 'Vert' },
        { en: 'Rizzo', fr: 'Rizzo', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '1/17', color1: 'Noir', color2: 'Gris' },
        { en: 'Roald', fr: 'Roald', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '1/5', color1: 'Rouge', color2: 'Jaune' },
        { en: 'Robin', fr: 'Robin', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '12/4', color1: 'Cyan', color2: 'Violet' },
        { en: 'Rocco', fr: 'Rocco', species_en: 'Hippo', species_fr: 'Hippo', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '8/18', color1: 'Jaune', color2: 'Noir' },
        { en: 'Rocket', fr: 'Rocket', species_en: 'Gorilla', species_fr: 'Gorille', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '4/14', color1: 'Rose', color2: 'Rouge' },
        { en: 'Rod', fr: 'Rod', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '8/14', color1: 'Bleu', color2: 'Cyan' },
        { en: 'Rodeo', fr: 'Rodeo', species_en: 'Bull', species_fr: 'Taureau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '10/29', color1: 'Noir', color2: 'Rouge' },
        { en: 'Rodney', fr: 'Rodney', species_en: 'Hamster', species_fr: 'Hamster', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '11/10', color1: 'Rose', color2: 'Colorée' },
        { en: 'Rolf', fr: 'Rolf', species_en: 'Tiger', species_fr: 'Tigre', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '8/22', color1: 'Bleu', color2: 'Noir' },
        { en: 'Rooney', fr: 'Rooney', species_en: 'Kangaroo', species_fr: 'Kangaroo', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '12/1', color1: 'Gris', color2: 'Noir' },
        { en: 'Rory', fr: 'Rory', species_en: 'Lion', species_fr: 'Lion', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '8/7', color1: 'Bleu', color2: 'Rouge' },
        { en: 'Roscoe', fr: 'Roscoe', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/16', color1: 'Noir', color2: 'Gris' },
        { en: 'Rosie', fr: 'Rosie', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '2/27', color1: 'Rose', color2: 'Rouge' },
        { en: 'Roswell', fr: 'Roswell', species_en: 'Alligator', species_fr: 'Alligator', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '5/2', color1: 'Beige', color2: 'Marron' },
        { en: 'Rowan', fr: 'Rowan', species_en: 'Tiger', species_fr: 'Tigre', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '8/26', color1: 'Cyan', color2: 'Gris' },
        { en: 'Ruby', fr: 'Ruby', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '12/25', color1: 'Cyan', color2: 'Rose' },
        { en: 'Rudy', fr: 'Rudy', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '12/20', color1: 'Jaune', color2: 'Beige' },
        { en: 'Sally', fr: 'Sally', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/19', color1: 'Blanc', color2: 'Beige' },
        { en: 'Samson', fr: 'Samson', species_en: 'Mouse', species_fr: 'Souris', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '7/5', color1: 'Rouge', color2: 'Jaune' },
        { en: 'Sandy', fr: 'Sandy', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '10/21', color1: 'Cyan', color2: 'Blanc' },
        { en: 'Sasha', fr: 'Sasha', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '5/19', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Savannah', fr: 'Savannah', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '1/25', color1: 'Cyan', color2: 'Bleu' },
        { en: 'Scoot', fr: 'Scoot', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '6/13', color1: 'Beige', color2: 'Bleu' },
        { en: 'Shari', fr: 'Shari', species_en: 'Monkey', species_fr: 'Singe', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '4/10', color1: 'Cyan', color2: 'Jaune' },
        { en: 'Sheldon', fr: 'Sheldon', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '2/26', color1: 'Vert', color2: 'Jaune' },
        { en: 'Shep', fr: 'Shep', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '11/24', color1: 'Cyan', color2: 'Bleu' },
        { en: 'Sherb', fr: 'Sherb', species_en: 'Goat', species_fr: 'Chèvre', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '1/18', color1: 'Gris', color2: 'Bleu' },
        { en: 'Shino', fr: 'Shino', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/31', color1: 'Rouge', color2: 'Noir' },
        { en: 'Simon', fr: 'Simon', species_en: 'Monkey', species_fr: 'Singe', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '1/19', color1: 'Rouge', color2: 'Colorée' },
        { en: 'Skye', fr: 'Skye', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '3/24', color1: 'Bleu', color2: 'Blanc' },
        { en: 'Sly', fr: 'Sly', species_en: 'Alligator', species_fr: 'Alligator', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '11/15', color1: 'Marron', color2: 'Vert' },
        { en: 'Snake', fr: 'Snake', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '11/3', color1: 'Noir', color2: 'Bleu' },
        { en: 'Snooty', fr: 'Snooty', species_en: 'Anteater', species_fr: 'Fourmilier', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/24', color1: 'Vert', color2: 'Jaune' },
        { en: 'Soleil', fr: 'Soleil', species_en: 'Hamster', species_fr: 'Hamster', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '8/9', color1: 'Rouge', color2: 'Jaune' },
        { en: 'Sparro', fr: 'Sparro', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '11/20', color1: 'Vert', color2: 'Gris' },
        { en: 'Spike', fr: 'Spike', species_en: 'Rhinoceros', species_fr: 'Rhinoceros', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '6/17', color1: 'Noir', color2: 'Gris' },
        { en: 'Spork', fr: 'Spork', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '9/3', color1: 'Vert', color2: 'Colorée' },
        { en: 'Sprinkle', fr: 'Sprinkle', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '2/20', color1: 'Cyan', color2: 'Blanc' },
        { en: 'Sprocket', fr: 'Sprocket', species_en: 'Ostrich', species_fr: 'Autruche', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '12/1', color1: 'Orange', color2: 'Vert' },
        { en: 'Static', fr: 'Static', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '7/9', color1: 'Noir', color2: 'Jaune' },
        { en: 'Stella', fr: 'Stella', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '4/9', color1: 'Jaune', color2: 'Beige' },
        { en: 'Sterling', fr: 'Sterling', species_en: 'Eagle', species_fr: 'Aigle', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '12/11', color1: 'Bleu', color2: 'Rouge' },
        { en: 'Stinky', fr: 'Stinky', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '8/17', color1: 'Rouge', color2: 'Bleu' },
        { en: 'Stitches', fr: 'Stitches', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '2/10', color1: 'Colorée', color2: 'Blanc' },
        { en: 'Stu', fr: 'Stu', species_en: 'Bull', species_fr: 'Taureau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '4/20', color1: 'Marron', color2: 'Beige' },
        { en: 'Sydney', fr: 'Sydney', species_en: 'Koala', species_fr: 'Koala', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/21', color1: 'Beige', color2: 'Jaune' },
        { en: 'Sylvana', fr: 'Sylvana', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '10/22', color1: 'Vert', color2: 'Violet' },
        { en: 'Sylvia', fr: 'Sylvia', species_en: 'Kangaroo', species_fr: 'Kangaroo', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '5/3', color1: 'Jaune', color2: 'Vert' },
        { en: 'T-Bone', fr: 'T-Bone', species_en: 'Bull', species_fr: 'Taureau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '5/20', color1: 'Bleu', color2: 'Noir' },
        { en: 'Tabby', fr: 'Tabby', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '8/13', color1: 'Noir', color2: 'Gris' },
        { en: 'Tad', fr: 'Tad', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '8/3', color1: 'Jaune', color2: 'Colorée' },
        { en: 'Tammi', fr: 'Tammi', species_en: 'Monkey', species_fr: 'Singe', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '4/2', color1: 'Violet', color2: 'Vert' },
        { en: 'Tammy', fr: 'Tammy', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '6/23', color1: 'Rouge', color2: 'Violet' },
        { en: 'Tangy', fr: 'Tangy', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/17', color1: 'Vert', color2: 'Jaune' },
        { en: 'Tank', fr: 'Tank', species_en: 'Rhinoceros', species_fr: 'Rhinoceros', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '5/6', color1: 'Rouge', color2: 'Vert' },
        { en: 'Tasha', fr: 'Tasha', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '11/30', color1: 'Beige', color2: 'Gris' },
        { en: 'Teddy', fr: 'Teddy', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '9/26', color1: 'Jaune', color2: 'Orange' },
        { en: 'Tex', fr: 'Tex', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '10/6', color1: 'Noir', color2: 'Gris' },
        { en: 'Tia', fr: 'Tia', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '11/18', color1: 'Noir', color2: 'Blanc' },
        { en: 'Tiansheng', fr: 'Tiansheng', species_en: 'Monkey', species_fr: 'Singe', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '8/18', color1: 'Vert', color2: 'Jaune' },
        { en: 'Tiffany', fr: 'Tiffany', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '1/9', color1: 'Noir', color2: 'Rouge' },
        { en: 'Timbra', fr: 'Timbra', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '10/21', color1: 'Vert', color2: 'Marron' },
        { en: 'Tipper', fr: 'Tipper', species_en: 'Cow', species_fr: 'Vâche', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '8/25', color1: 'Colorée', color2: 'Rose' },
        { en: 'Toby', fr: 'Toby', species_en: 'Rabbit', species_fr: 'Lapin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '7/10', color1: 'Vert', color2: 'Rouge' },
        { en: 'Tom', fr: 'Tom', species_en: 'Cat', species_fr: 'Chat', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '12/10', color1: 'Noir', color2: 'Gris' },
        { en: 'Truffles', fr: 'Truffles', species_en: 'Pig', species_fr: 'Cochon', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '7/28', color1: 'Vert', color2: 'Rouge' },
        { en: 'Tucker', fr: 'Tucker', species_en: 'Elephant', species_fr: 'Élephant', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '9/7', color1: 'Jaune', color2: 'Orange' },
        { en: 'Tulin', fr: 'Tulin', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '3/3', color1: 'Vert', color2: 'Bleu' },
        { en: 'Tutu', fr: 'Tutu', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '9/15', color1: 'Rose', color2: 'Rouge' },
        { en: 'Twiggy', fr: 'Twiggy', species_en: 'Bird', species_fr: 'Oiseau', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '7/13', color1: 'Rose', color2: 'Bleu' },
        { en: 'Tybalt', fr: 'Tybalt', species_en: 'Tiger', species_fr: 'Tigre', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Jock', personality_fr: 'Sportif', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '8/19', color1: 'Bleu', color2: 'Violet' },
        { en: 'Ursala', fr: 'Ursala', species_en: 'Bear', species_fr: 'Ours', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Big Sister', personality_fr: 'Big Sister', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '1/16', color1: 'Rouge', color2: 'Orange' },
        { en: 'Velma', fr: 'Velma', species_en: 'Goat', species_fr: 'Chèvre', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '1/14', color1: 'Cyan', color2: 'Violet' },
        { en: 'Vesta', fr: 'Vesta', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '4/16', color1: 'Orange', color2: 'Rouge' },
        { en: 'Vic', fr: 'Vic', species_en: 'Bull', species_fr: 'Taureau', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '12/29', color1: 'Cyan', color2: 'Bleu' },
        { en: 'Viché', fr: 'Viché', species_en: 'Squirrel', species_fr: 'Écureui', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '7/7', color1: 'Jaune', color2: 'Blanc' },
        { en: 'Victoria', fr: 'Victoria', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '7/11', color1: 'Jaune', color2: 'Orange' },
        { en: 'Violet', fr: 'Violet', species_en: 'Gorilla', species_fr: 'Gorille', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '9/1', color1: 'Violet', color2: 'Rose' },
        { en: 'Vivian', fr: 'Vivian', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '1/26', color1: 'Gris', color2: 'Violet' },
        { en: 'Vladimir', fr: 'Vladimir', species_en: 'Bear cub', species_fr: 'Ourson', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '8/2', color1: 'Jaune', color2: 'Colorée' },
        { en: 'Wade', fr: 'Wade', species_en: 'Penguin', species_fr: 'Penguin', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '10/30', color1: 'Cyan', color2: 'Bleu' },
        { en: 'Walker', fr: 'Walker', species_en: 'Dog', species_fr: 'Chien', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Play', hobby_fr: 'Jeux', birthday: '6/10', color1: 'Orange', color2: 'Rouge' },
        { en: 'Walt', fr: 'Walt', species_en: 'Kangaroo', species_fr: 'Kangaroo', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Fitness', hobby_fr: 'Fitness', birthday: '4/24', color1: 'Noir', color2: 'Gris' },
        { en: 'Wart Jr.', fr: 'Wart Jr.', species_en: 'Frog', species_fr: 'Grenouille', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '8/21', color1: 'Bleu', color2: 'Violet' },
        { en: 'Weber', fr: 'Weber', species_en: 'Duck', species_fr: 'Canard', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '6/30', color1: 'Bleu', color2: 'Noir' },
        { en: 'Wendy', fr: 'Wendy', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '8/15', color1: 'Rouge', color2: 'Vert' },
        { en: 'Whitney', fr: 'Whitney', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '9/17', color1: 'Bleu', color2: 'Cyan' },
        { en: 'Willow', fr: 'Willow', species_en: 'Sheep', species_fr: 'Mouton', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '11/26', color1: 'Blanc', color2: 'Rose' },
        { en: 'Winnie', fr: 'Winnie', species_en: 'Horse', species_fr: 'Cheval', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Peppy', personality_fr: 'Pétillante', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '1/31', color1: 'Blanc', color2: 'Gris' },
        { en: 'Wolfgang', fr: 'Wolfgang', species_en: 'Wolf', species_fr: 'Loup', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Cranky', personality_fr: 'Boudeur', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '11/25', color1: 'Noir', color2: 'Vert' },
        { en: 'Yuka', fr: 'Yuka', species_en: 'Koala', species_fr: 'Koala', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Snooty', personality_fr: 'Snob', hobby_en: 'Fashion', hobby_fr: 'Mode', birthday: '7/20', color1: 'Orange', color2: 'Jaune' },
        { en: 'Zell', fr: 'Zell', species_en: 'Deer', species_fr: 'Cerf', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Smug', personality_fr: 'Mignon', hobby_en: 'Music', hobby_fr: 'Musique', birthday: '6/7', color1: 'Violet', color2: 'Gris' },
        { en: 'Zoe', fr: 'Zoe', species_en: 'Anteater', species_fr: 'Fourmilier', gender_en: 'Female', gender_fr: 'Femelle', personality_en: 'Normal', personality_fr: 'Normal', hobby_en: 'Education', hobby_fr: 'Éducation', birthday: '2/10', color1: 'Rose', color2: 'Blanc' },
        { en: 'Zucker', fr: 'Zucker', species_en: 'Octopus', species_fr: 'Poulpe', gender_en: 'Male', gender_fr: 'Mâle', personality_en: 'Lazy', personality_fr: 'Paresseux', hobby_en: 'Nature', hobby_fr: 'Nature', birthday: '3/8', color1: 'Bleu', color2: 'Jaune' }
        ];

    villagerData: Array<{
        en: string;
        fr: string;
        species: string;
        gender: string;
        personality: string;
        hobby: string;
        birthday: string;
        color1: string;
        color2: string;
        isFavorite: WritableSignal<boolean>;
        isAdded: WritableSignal<boolean>;
    }>;

    searchQuery   = signal('');
    sortMode      = signal<'alpha-asc' | 'alpha-desc'>('alpha-asc');
    genderFilter = signal<'all' | 'Mâle' | 'Femelle'>('all');
    speciesFilter = signal<string>('all');
    personalityFilter = signal<string>('all');
    filterPanelOpen = false;
    @Output() goHome = new EventEmitter<void>();

    private isTaggedVillager(value: any): boolean {
        if (!value || typeof value !== 'object') return false;
        const hasName = typeof value.en === 'string' || typeof value.fr === 'string';
        return hasName && (typeof value.isFavorite === 'boolean' || typeof value.isAdded === 'boolean');
    }

    private buildTaggedVillagersPayload(): Array<{ en: string; fr: string; isFavorite: boolean; isAdded: boolean }> {
        return this.villagerData
            .filter((v) => v.isFavorite() || v.isAdded())
            .map((v) => ({
                en: v.en,
                fr: v.fr,
                isFavorite: v.isFavorite(),
                isAdded: v.isAdded(),
            }));
    }

    private applyTaggedVillagers(taggedVillagers: any[]): void {
        const byEn = new Map<string, any>();
        const byFr = new Map<string, any>();

        for (const row of taggedVillagers) {
            if (!this.isTaggedVillager(row)) continue;
            if (typeof row.en === 'string') byEn.set(row.en, row);
            if (typeof row.fr === 'string') byFr.set(row.fr, row);
        }

        for (const villager of this.villagerData) {
            const fromDb = byEn.get(villager.en) ?? byFr.get(villager.fr);
            if (!fromDb) {
                villager.isFavorite.set(false);
                villager.isAdded.set(false);
                continue;
            }

            villager.isFavorite.set(!!fromDb.isFavorite);
            villager.isAdded.set(!!fromDb.isAdded);
        }
    }

    private async persistTaggedVillagers(): Promise<void> {
        const payload = this.buildTaggedVillagersPayload();
        const device = SupabaseService.getOrCreateDeviceFootprint();
        const accounts = await SupabaseService.getAccountByDevice(device);

        let accountId: number | null = null;
        if (accounts && accounts.length > 0) {
            accountId = accounts[0].id;
        } else {
            const created = await SupabaseService.createAccount({
                'island-name': '',
                hemisphere: '',
                fruit: '',
                'device-footprint': device,
            });
            if (created && created.id) {
                accountId = created.id;
            }
        }

        if (accountId === null) {
            throw new Error('Unable to persist villagers: no account id available');
        }

        const dataRows = await SupabaseService.getDataById(accountId);
        if (dataRows && dataRows.length > 0) {
            await SupabaseService.updateData(accountId, { villagers: payload });
        } else {
            await SupabaseService.createData({ id: accountId, villagers: payload });
        }
    }

    constructor(){
        // Ensure `fr` values use the authoritative mapping from `villagerNames`.
        // This updates any raw entries where `fr` was left equal to `en`.
        const _nameMap = new Map<string, string>(villagerNames.map(n => [n.en, n.fr]));
        for (const r of this.raw) {
            const m = _nameMap.get(r.en);
            if (m) r.fr = m;
        }

        this.villagerData = this.raw.map((r: any) => {
            const b = (r.birthday || '').toString();
            const parts = b.split('/');
            let birthday = b;
            if (parts.length === 2) {
                const m = parts[0].padStart(2, '0');
                const d = parts[1].padStart(2, '0');
                birthday = `${d}/${m}`;
            }

            const match = villagerNames.find(v => v.en === r.en);
            return {
                en: r.en,
                fr: match ? match.fr : (r.fr || r.en),
                species: r.species_fr || r.species_en || '',
                gender: r.gender_fr || r.gender_en || '',
                personality: r.personality_fr || r.personality_en || '',
                hobby: r.hobby_fr || r.hobby_en || '',
                birthday,
                color1: r.color1 || '',
                color2: r.color2 || '',
                isFavorite: signal(false),
                isAdded: signal(false),
            };
        }).sort((a, b) => a.fr.localeCompare(b.fr, 'fr', { sensitivity: 'base' }));

        // Load user-specific flags from Supabase (isAdded / isFavorite)
        this.loadUserFlags();
    }

    async loadUserFlags(): Promise<void> {
        try {
            for (const villager of this.villagerData) {
                villager.isFavorite.set(false);
                villager.isAdded.set(false);
            }

            const device = SupabaseService.getOrCreateDeviceFootprint();
            const accounts = await SupabaseService.getAccountByDevice(device);
            if (!accounts || accounts.length === 0) return;
            const id = accounts[0].id;
            const dataRows = await SupabaseService.getDataById(id);
            if (!dataRows || dataRows.length === 0) return;

            const row = dataRows[0];
            if (Array.isArray(row.villagers) && row.villagers.some((v: any) => this.isTaggedVillager(v))) {
                this.applyTaggedVillagers(row.villagers);
                return;
            }

            // Legacy fallback for old schema (favorites + villagers[name]).
            const added = Array.isArray(row.villagers)
                ? row.villagers.map((v: any) => (v ? v.name : null)).filter(Boolean)
                : [];
            const favorites = Array.isArray(row.favorites)
                ? row.favorites
                : (Array.isArray(row.favs) ? row.favs : []);

            for (const v of this.villagerData) {
                if (added.includes(v.fr)) v.isAdded.set(true);
                if (favorites.includes(v.fr)) v.isFavorite.set(true);
            }

            await this.persistTaggedVillagers();
        } catch (err) {
            console.error('Error loading user villager flags', err);
        }
    }

    async toggleFavorite(villager: any): Promise<void> {
        // flip local signal immediately for responsiveness
        const newVal = !villager.isFavorite();
        villager.isFavorite.set(newVal);

        try {
            await this.persistTaggedVillagers();
        } catch (err) {
            villager.isFavorite.set(!newVal);
            console.error('Error toggling favorite', err);
        }
    }

    async toggleAdded(villager: any): Promise<void> {
        const newVal = !villager.isAdded();
        villager.isAdded.set(newVal);

        try {
            await this.persistTaggedVillagers();
        } catch (err) {
            villager.isAdded.set(!newVal);
            console.error('Error toggling added', err);
        }
    }

    iconPath(englishName: string): string{
        return `icons/villager_icons/${encodeURIComponent(englishName)}.png`;
    }

    filteRougeVillagers = computed(() => {
    let list = [...this.villagerData];

    const q = this.searchQuery().toLowerCase();
    if (q) list = list.filter(v =>
        v.fr.toLowerCase().includes(q) || v.en.toLowerCase().includes(q)
    );

    if (this.genderFilter() !== 'all')
        list = list.filter(v => v.gender === this.genderFilter());

    if (this.speciesFilter() !== 'all')
        list = list.filter(v => v.species === this.speciesFilter());

    if (this.personalityFilter() !== 'all')
        list = list.filter(v => v.personality === this.personalityFilter());

    return list.sort((a, b) =>
        this.sortMode() === 'alpha-asc'
            ? a.fr.localeCompare(b.fr, 'fr', { sensitivity: 'base' })
            : b.fr.localeCompare(a.fr, 'fr', { sensitivity: 'base' })
    );
});

// ── Unique values for filter options ──
get uniqueSpecies(): string[] {
    return [...new Set(this.villagerData.map(v => v.species))].sort();
}

get uniquePersonalities(): string[] {
    return [...new Set(this.villagerData.map(v => v.personality))].sort();
}

// ── Methods ──
onSearch(e: Event): void {
    this.searchQuery.set((e.target as HTMLInputElement).value);
}

toggleFilterPanel(): void { this.filterPanelOpen = !this.filterPanelOpen; }
setSort(mode: 'alpha-asc' | 'alpha-desc'): void { this.sortMode.set(mode); }
setGender(g: 'all' | 'Mâle' | 'Femelle'): void { this.genderFilter.set(g); }
setSpecies(s: string): void { this.speciesFilter.set(s); }
setPersonality(p: string): void { this.personalityFilter.set(p); }

resetFilters(): void {
    this.sortMode.set('alpha-asc');
    this.genderFilter.set('all');
    this.speciesFilter.set('all');
    this.personalityFilter.set('all');
    this.searchQuery.set('');
}

goBack(): void {
  this.goHome.emit();
}
}
