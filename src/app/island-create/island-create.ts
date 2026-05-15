import { Component, computed, signal, WritableSignal } from '@angular/core';
import { Village } from '../models/village';
import { NgIf, NgForOf } from "../../../node_modules/@angular/common/types/_common_module-chunk";
import { SupabaseService } from '../supabase.service';

const villagerNames: { en: string; fr: string }[] = [
  { en: 'Ace', fr: 'Boumboum' },
  { en: 'Admiral', fr: 'Maréchal' },
  { en: 'Agent S', fr: 'Ninjette' },
  { en: 'Agnes', fr: 'Pansy' },
  { en: 'Al', fr: 'Gustave' },
  { en: 'Alfonso', fr: 'Alphonse' },
  { en: 'Alice', fr: 'Alice' },
  { en: 'Alli', fr: 'Allie' },
  { en: 'Amelia', fr: 'Aurélie' },
  { en: 'Anabelle', fr: 'Anabelle' },
  { en: 'Anchovy', fr: 'Miguel' },
  { en: 'Angus', fr: 'Angus' },
  { en: 'Anicotti', fr: 'Annie' },
  { en: 'Ankha', fr: 'Neferti' },
  { en: 'Annalisa', fr: 'Roberta' },
  { en: 'Annalise', fr: 'Âne-lise' },
  { en: 'Antonio', fr: 'Antonio' },
  { en: 'Apollo', fr: 'Apollon' },
  { en: 'Apple', fr: 'Esther' },
  { en: 'Astrid', fr: 'Rhona' },
  { en: 'Audie', fr: 'Monica' },
  { en: 'Aurora', fr: 'Aurore' },
  { en: 'Ava', fr: 'Eva' },
  { en: 'Avery', fr: 'Faust' },
  { en: 'Axel', fr: 'Axel' },
  { en: 'Azalea', fr: 'Azalée' },
  { en: 'Baabara', fr: 'Bêêtty' },
  { en: 'Bam', fr: 'Nacer' },
  { en: 'Bangle', fr: 'Bengale' },
  { en: 'Barold', fr: 'Manu' },
  { en: 'Bea', fr: 'Béa' },
  { en: 'Beardo', fr: 'Eustache' },
  { en: 'Beau', fr: 'Stefaon' },
  { en: 'Becky', fr: 'Sonya' },
  { en: 'Bella', fr: 'Belle' },
  { en: 'Benedict', fr: 'Dimitri' },
  { en: 'Benjamin', fr: 'Bernardo' },
  { en: 'Bertha', fr: 'Bertha' },
  { en: 'Bettina', fr: 'Sabrina' },
  { en: 'Bianca', fr: 'Noémie' },
  { en: 'Biff', fr: 'Biff' },
  { en: 'Big Top', fr: 'Miles' },
  { en: 'Bill', fr: 'Choco' },
  { en: 'Billy', fr: 'Seguin' },
  { en: 'Biskit', fr: 'Crocket' },
  { en: 'Bitty', fr: 'Potama' },
  { en: 'Blaire', fr: 'Cachou' },
  { en: 'Blanche', fr: 'Sophie' },
  { en: 'Bluebear', fr: 'Myrtille' },
  { en: 'Bob', fr: 'Robert' },
  { en: 'Bonbon', fr: 'Sylvette' },
  { en: 'Bones', fr: 'Nonos' },
  { en: 'Boomer', fr: 'Ethan' },
  { en: 'Boone', fr: 'Babouin' },
  { en: 'Boots', fr: 'Croko' },
  { en: 'Boris', fr: 'Boris' },
  { en: 'Boyd', fr: 'Primo' },
  { en: 'Bree', fr: 'Quenotte' },
  { en: 'Broccolo', fr: 'Steven' },
  { en: 'Broffina', fr: 'Jo' },
  { en: 'Bruce', fr: 'Boubou' },
  { en: 'Bubbles', fr: 'Hippy' },
  { en: 'Buck', fr: 'Daniel' },
  { en: 'Bud', fr: 'Léonard' },
  { en: 'Bunnie', fr: 'Clara' },
  { en: 'Butch', fr: 'Avril' },
  { en: 'Buzz', fr: 'Phébus' },
  { en: 'Cally', fr: 'Célia' },
  { en: 'Camofrog', fr: 'Milos' },
  { en: 'Canberra', fr: 'Kolala' },
  { en: 'Candi', fr: 'Sucrette' },
  { en: 'Carmen', fr: 'Zoé' },
  { en: 'Caroline', fr: 'Isabelle' },
  { en: 'Carrie', fr: 'Kanga' },
  { en: 'Cashmere', fr: 'Cashmir' },
  { en: 'Cece', fr: 'Cece' },
  { en: 'Celia', fr: 'Garance' },
  { en: 'Cephalobot', fr: 'Octoborg' },
  { en: 'Cesar', fr: 'César' },
  { en: 'Chabwick', fr: 'Zinzin' },
  { en: 'Chadder', fr: 'Mozzar' },
  { en: 'Chai', fr: 'Chaï' },
  { en: 'Charlise', fr: 'Zabou' },
  { en: 'Chelsea', fr: 'Chelsea' },
  { en: 'Cheri', fr: 'Rosalie' },
  { en: 'Cherry', fr: 'Anna' },
  { en: 'Chester', fr: 'Placide' },
  { en: 'Chevre', fr: 'Biquette' },
  { en: 'Chief', fr: 'Chef' },
  { en: 'Chops', fr: 'Aaron' },
  { en: 'Chow', fr: 'Chulin' },
  { en: 'Chrissy', fr: 'Kristine' },
  { en: 'Claude', fr: 'Claude' },
  { en: 'Claudia', fr: 'Vanina' },
  { en: 'Clay', fr: 'Guido' },
  { en: 'Cleo', fr: 'Cléa' },
  { en: 'Clyde', fr: 'Dorian' },
  { en: 'Coach', fr: 'Arnold' },
  { en: 'Cobb', fr: 'Porken' },
  { en: 'Coco', fr: 'Coco' },
  { en: 'Cole', fr: 'Épicure' },
  { en: 'Colton', fr: 'Tony' },
  { en: 'Cookie', fr: 'Cookie' },
  { en: 'Cousteau', fr: 'Figaro' },
  { en: 'Cranston', fr: 'Gabin' },
  { en: 'Croque', fr: 'Carlos' },
  { en: 'Cube', fr: 'Cube' },
  { en: 'Curlos', fr: 'Tonton' },
  { en: 'Curly', fr: 'Tirbou' },
  { en: 'Curt', fr: 'Curt' },
  { en: 'Cyd', fr: 'Punk' },
  { en: 'Cyrano', fr: 'Cyrano' },
  { en: 'Daisy', fr: 'Naomie' },
  { en: 'Deena', fr: 'Mina' },
  { en: 'Deirdre', fr: 'Bichoune' },
  { en: 'Del', fr: 'Hector' },
  { en: 'Deli', fr: 'Magogo' },
  { en: 'Derwin', fr: 'Prof' },
  { en: 'Diana', fr: 'Didi' },
  { en: 'Diva', fr: 'Violette' },
  { en: 'Dizzy', fr: 'Pachy' },
  { en: 'Dobie', fr: 'Loupiot' },
  { en: 'Doc', fr: 'Doc' },
  { en: 'Dom', fr: 'Bouloche' },
  { en: 'Dora', fr: 'Dora' },
  { en: 'Dotty', fr: 'Dorothée' },
  { en: 'Drago', fr: 'Drago' },
  { en: 'Drake', fr: 'Colvert' },
  { en: 'Drift', fr: 'Gordon' },
  { en: 'Ed', fr: 'Édouard' },
  { en: 'Egbert', fr: 'Herbert' },
  { en: 'Elise', fr: 'Élise' },
  { en: 'Ellie', fr: 'Ella' },
  { en: 'Elmer', fr: 'Martin' },
  { en: 'Eloise', fr: 'Éloïse' },
  { en: 'Elvis', fr: 'Elvis' },
  { en: 'Erik', fr: 'Abraham' },
  { en: 'Étoile', fr: 'Étoile' },
  { en: 'Eugene', fr: 'Jamy' },
  { en: 'Eunice', fr: 'Bérénice' },
  { en: 'Faith', fr: 'Kolette' },
  { en: 'Fang', fr: 'Pierrot' },
  { en: 'Fauna', fr: 'Bibi' },
  { en: 'Felicity', fr: 'Maud' },
  { en: 'Filbert', fr: 'Filibert' },
  { en: 'Flip', fr: 'Rudy' },
  { en: 'Flo', fr: 'Nora' },
  { en: 'Flora', fr: 'Justine' },
  { en: 'Flurry', fr: 'Emma' },
  { en: 'Francine', fr: 'Nadine' },
  { en: 'Frank', fr: 'Greggae' },
  { en: 'Freckles', fr: 'Caro' },
  { en: 'Frett', fr: 'Foufou' },
  { en: 'Freya', fr: 'Luppa' },
  { en: 'Friga', fr: 'Friga' },
  { en: 'Frita', fr: 'Clarabêl' },
  { en: 'Frobert', fr: 'Verbert' },
  { en: 'Fuchsia', fr: 'Rosanne' },
  { en: 'Gabi', fr: 'Gaby' },
  { en: 'Gala', fr: 'Camille' },
  { en: 'Gaston', fr: 'Gaston' },
  { en: 'Gayle', fr: 'Odile' },
  { en: 'Genji', fr: 'Kali' },
  { en: 'Gigi', fr: 'Gloria' },
  { en: 'Gladys', fr: 'Gladys' },
  { en: 'Gloria', fr: 'Déborah' },
  { en: 'Goldie', fr: 'Mirza' },
  { en: 'Gonzo', fr: 'Gonzo' },
  { en: 'Goose', fr: 'Pouli' },
  { en: 'Graham', fr: 'Graham' },
  { en: 'Greta', fr: 'Greta' },
  { en: 'Grizzly', fr: 'Grizzly' },
  { en: 'Groucho', fr: 'Ronchon' },
  { en: 'Gruff', fr: 'Grognon' },
  { en: 'Gwen', fr: 'Gwen' },
  { en: 'Hamlet', fr: 'Jojo' },
  { en: 'Hamphrey', fr: 'Charles' },
  { en: 'Hans', fr: 'Loran' },
  { en: 'Harry', fr: 'Bob' },
  { en: 'Hazel', fr: 'Pamela' },
  { en: 'Henry', fr: 'Henri' },
  { en: 'Hippeux', fr: 'Paulito' },
  { en: 'Hopkins', fr: 'Grignote' },
  { en: 'Hopper', fr: 'Victor' },
  { en: 'Hornsby', fr: 'Cornio' },
  { en: 'Huck', fr: 'Bajoue' },
  { en: 'Hugh', fr: 'Bonno' },
  { en: 'Iggly', fr: 'Urbain' },
  { en: 'Ike', fr: 'Isaac' },
  { en: 'Ione', fr: 'Terra' },
  { en: 'Jacob', fr: 'Jacob' },
  { en: 'Jacques', fr: 'Jacky' },
  { en: 'Jambette', fr: 'Gambette' },
  { en: 'Jay', fr: 'Gérard' },
  { en: 'Jeremiah', fr: 'Jérémie' },
  { en: 'Jitters', fr: 'Gilbert' },
  { en: 'Joey', fr: 'Joseph' },
  { en: 'Judy', fr: 'Laura' },
  { en: 'Julia', fr: 'Julie' },
  { en: 'Julian', fr: 'Lico' },
  { en: 'June', fr: 'Agnès' },
  { en: 'Kabuki', fr: 'Kabuki' },
  { en: 'Katt', fr: 'Kat' },
  { en: 'Keaton', fr: 'Enzo' },
  { en: 'Ken', fr: 'Ken' },
  { en: 'Ketchup', fr: 'Ketchup' },
  { en: 'Kevin', fr: 'Jean-Bon' },
  { en: 'Kid Cat', fr: 'Câlin' },
  { en: 'Kidd', fr: 'Moktar' },
  { en: 'Kiki', fr: 'Kiki' },
  { en: 'Kitt', fr: 'Poquette' },
  { en: 'Kitty', fr: 'Kitty' },
  { en: 'Klaus', fr: 'Klaus' },
  { en: 'Knox', fr: 'Wolfram' },
  { en: 'Kody', fr: 'Bill' },
  { en: 'Kyle', fr: 'Gary' },
  { en: 'Leonardo', fr: 'Dolph' },
  { en: 'Leopold', fr: 'Leandro' },
  { en: 'Lily', fr: 'Raina' },
  { en: 'Limberg', fr: 'Gruyère' },
  { en: 'Lionel', fr: 'Léopold' },
  { en: 'Lobo', fr: 'Lobo' },
  { en: 'Lolly', fr: 'Linette' },
  { en: 'Lopez', fr: 'Jon' },
  { en: 'Louie', fr: 'Louis' },
  { en: 'Lucha', fr: 'Condor' },
  { en: 'Lucky', fr: 'Ramsès' },
  { en: 'Lucy', fr: 'Lucie' },
  { en: 'Lyman', fr: 'Kalyptus' },
  { en: 'Mac', fr: 'Brutus' },
  { en: 'Maddie', fr: 'Olympe' },
  { en: 'Maelle', fr: 'Maëlle' },
  { en: 'Maggie', fr: 'Marjorie' },
  { en: 'Mallary', fr: 'Mallory' },
  { en: 'Maple', fr: 'Léa' },
  { en: 'Marcel', fr: 'Ismaël' },
  { en: 'Marcie', fr: 'Selma' },
  { en: 'Margie', fr: 'Maguy' },
  { en: 'Marina', fr: 'Marina' },
  { en: 'Marlo', fr: 'Marlou' },
  { en: 'Marshal', fr: 'Mathéo' },
  { en: 'Marty', fr: 'Marty' },
  { en: 'Mathilda', fr: 'Mathilde' },
  { en: 'Megan', fr: 'Candy' },
  { en: 'Melba', fr: 'Melba' },
  { en: 'Merengue', fr: 'Patty' },
  { en: 'Merry', fr: 'Suzy' },
  { en: 'Midge', fr: 'Michèle' },
  { en: 'Mineru', fr: 'Mineru' },
  { en: 'Mint', fr: 'Amande' },
  { en: 'Mira', fr: 'Grisette' },
  { en: 'Miranda', fr: 'Maëllis' },
  { en: 'Mitzi', fr: 'Mistigri' },
  { en: 'Moe', fr: 'Momo' },
  { en: 'Molly', fr: 'Molly' },
  { en: 'Monique', fr: 'Monique' },
  { en: 'Monty', fr: 'Lourant' },
  { en: 'Moose', fr: 'Joachim' },
  { en: 'Mott', fr: 'Aimé' },
  { en: 'Muffy', fr: 'Charlène' },
  { en: 'Murphy', fr: 'Eddie' },
  { en: 'Nan', fr: 'Nana' },
  { en: 'Nana', fr: 'Mireille' },
  { en: 'Naomi', fr: 'Maiko' },
  { en: 'Nate', fr: 'Nathan' },
  { en: 'Nibbles', fr: 'Lola' },
  { en: 'Norma', fr: 'Norma' },
  { en: "O'Hare", fr: 'Civet' },
  { en: 'Octavian', fr: 'Octave' },
  { en: 'Olaf', fr: 'Blair' },
  { en: 'Olive', fr: 'Grisa' },
  { en: 'Olivia', fr: 'Olivia' },
  { en: 'Opal', fr: 'Opaline' },
  { en: 'Ozzie', fr: 'Koko' },
  { en: 'Pancetti', fr: 'Lydie' },
  { en: 'Pango', fr: 'Mathilda' },
  { en: 'Paolo', fr: 'Paolo' },
  { en: 'Papi', fr: 'Bourrico' },
  { en: 'Pashmina', fr: 'Chavrina' },
  { en: 'Pate', fr: 'Terrine' },
  { en: 'Patty', fr: 'Margaux' },
  { en: 'Paula', fr: 'Wendy' },
  { en: 'Peaches', fr: 'Prune' },
  { en: 'Peanut', fr: 'Rachida' },
  { en: 'Pecan', fr: 'Pécan' },
  { en: 'Peck', fr: 'Pec' },
  { en: 'Peewee', fr: 'Gogo' },
  { en: 'Peggy', fr: 'Rose' },
  { en: 'Pekoe', fr: 'Pauline' },
  { en: 'Penelope', fr: 'Missy' },
  { en: 'Petri', fr: 'Shimi' },
  { en: 'Phil', fr: 'Phil' },
  { en: 'Phoebe', fr: 'Faustine' },
  { en: 'Pierce', fr: 'Napoléon' },
  { en: 'Pietro', fr: 'Pietro' },
  { en: 'Pinky', fr: 'Rosine' },
  { en: 'Piper', fr: 'Neige' },
  { en: 'Pippy', fr: 'Nadia' },
  { en: 'Plucky', fr: 'Poulette' },
  { en: 'Pompom', fr: 'Pompon' },
  { en: 'Poncho', fr: 'Théo' },
  { en: 'Poppy', fr: 'Irène' },
  { en: 'Portia', fr: 'Dalma' },
  { en: 'Prince', fr: 'Prince' },
  { en: 'Puck', fr: 'Hervé' },
  { en: 'Puddles', fr: 'Rénata' },
  { en: 'Pudge', fr: 'Gradub' },
  { en: 'Punchy', fr: 'Cédric' },
  { en: 'Purrl', fr: 'Perle' },
  { en: 'Queenie', fr: 'Reine' },
  { en: 'Quillson', fr: 'Narcisse' },
  { en: 'Quinn', fr: 'Astair' },
  { en: 'Raddle', fr: 'Fabien' },
  { en: 'Rasher', fr: 'Salami' },
  { en: 'Raymond', fr: 'Raymond' },
  { en: 'Renée', fr: 'Rina' },
  { en: 'Reneigh', fr: 'Jennifer' },
  { en: 'Rex', fr: 'Léo' },
  { en: 'Rhonda', fr: 'Renée' },
  { en: 'Ribbot', fr: 'Crabot' },
  { en: 'Ricky', fr: 'Rocky' },
  { en: 'Rilla', fr: 'Rilla' },
  { en: 'Rio', fr: 'Estrella' },
  { en: 'Rizzo', fr: 'Sourizzi' },
  { en: 'Roald', fr: 'Reynald' },
  { en: 'Robin', fr: 'Robie' },
  { en: 'Rocco', fr: 'Bebel' },
  { en: 'Rocket', fr: 'Gertrude' },
  { en: 'Rod', fr: 'Marcel' },
  { en: 'Rodeo', fr: 'Flèche' },
  { en: 'Rodney', fr: 'Chico' },
  { en: 'Rolf', fr: 'Ralf' },
  { en: 'Rooney', fr: 'Mike' },
  { en: 'Rory', fr: 'Hercule' },
  { en: 'Roscoe', fr: 'Rosco' },
  { en: 'Rosie', fr: 'Rosie' },
  { en: 'Roswell', fr: 'Roswell' },
  { en: 'Rowan', fr: 'Marito' },
  { en: 'Ruby', fr: 'Rubis' },
  { en: 'Rudy', fr: 'Rougepif' },
  { en: 'Sally', fr: 'Damia' },
  { en: 'Samson', fr: 'Samson' },
  { en: 'Sandy', fr: 'Ottie' },
  { en: 'Sasha', fr: 'Alix' },
  { en: 'Savannah', fr: 'Savana' },
  { en: 'Scoot', fr: 'Scooter' },
  { en: 'Shari', fr: 'Luna' },
  { en: 'Sheldon', fr: 'Roy' },
  { en: 'Shep', fr: 'Mehdi' },
  { en: 'Sherb', fr: 'Capri' },
  { en: 'Shino', fr: 'Shino' },
  { en: 'Simon', fr: 'Simon' },
  { en: 'Skye', fr: 'Marilou' },
  { en: 'Sly', fr: 'Chuck' },
  { en: 'Snake', fr: 'Jeannot' },
  { en: 'Snooty', fr: 'Tarina' },
  { en: 'Soleil', fr: 'Stella' },
  { en: 'Sparro', fr: 'Darius' },
  { en: 'Spike', fr: 'Rhino' },
  { en: 'Spork', fr: 'Justin' },
  { en: 'Sprinkle', fr: 'Laurie' },
  { en: 'Sprocket', fr: 'Laflèche' },
  { en: 'Static', fr: 'Électro' },
  { en: 'Stella', fr: 'Bigoudi' },
  { en: 'Sterling', fr: 'Manfred' },
  { en: 'Stinky', fr: 'Tupux' },
  { en: 'Stitches', fr: 'Miro' },
  { en: 'Stu', fr: 'Beubeu' },
  { en: 'Sydney', fr: 'Koaline' },
  { en: 'Sylvana', fr: 'Mounia' },
  { en: 'Sylvia', fr: 'Madsi' },
  { en: 'T-Bone', fr: 'Steakos' },
  { en: 'Tabby', fr: 'Tigri' },
  { en: 'Tad', fr: 'Rénato' },
  { en: 'Tammi', fr: 'Lili' },
  { en: 'Tammy', fr: 'Vanessa' },
  { en: 'Tangy', fr: 'Marine' },
  { en: 'Tank', fr: 'Ben' },
  { en: 'Tasha', fr: 'Nadeige' },
  { en: 'Teddy', fr: 'Teddy' },
  { en: 'Tex', fr: 'Émilien' },
  { en: 'Tia', fr: 'Fanny' },
  { en: 'Tiansheng', fr: 'Tiansheng' },
  { en: 'Tiffany', fr: 'Tiphaine' },
  { en: 'Timbra', fr: 'Sélène' },
  { en: 'Tipper', fr: 'Valé' },
  { en: 'Toby', fr: 'Toby' },
  { en: 'Tom', fr: 'Tom' },
  { en: 'Truffles', fr: 'Trufa' },
  { en: 'Tucker', fr: 'Barry' },
  { en: 'Tulin', fr: 'Tulin' },
  { en: 'Tutu', fr: 'Tutu' },
  { en: 'Twiggy', fr: 'Titi' },
  { en: 'Tybalt', fr: 'Jeff' },
  { en: 'Ursala', fr: 'Oursula' },
  { en: 'Velma', fr: 'Véra' },
  { en: 'Vesta', fr: 'Hélaine' },
  { en: 'Vic', fr: 'Toto' },
  { en: 'Viché', fr: 'Viché' },
  { en: 'Victoria', fr: 'Victoria' },
  { en: 'Violet', fr: 'Gaëlle' },
  { en: 'Vivian', fr: 'Viviane' },
  { en: 'Vladimir', fr: 'Vladimir' },
  { en: 'Wade', fr: 'Miglou' },
  { en: 'Walker', fr: 'George' },
  { en: 'Walt', fr: 'Walt' },
  { en: 'Wart Jr.', fr: 'Crakos' },
  { en: 'Weber', fr: 'Bébert' },
  { en: 'Wendy', fr: 'Karen' },
  { en: 'Whitney', fr: 'Blanche' },
  { en: 'Willow', fr: 'Maï' },
  { en: 'Winnie', fr: 'Anne' },
  { en: 'Wolfgang', fr: 'Wolfgang' },
  { en: 'Yuka', fr: 'Calypso' },
  { en: 'Zell', fr: 'Régis' },
  { en: 'Zoe', fr: 'Cléo' },
  { en: 'Zucker', fr: 'Marvin' },
] as const;

@Component({
  selector: 'app-island-create',
  imports: [],
  templateUrl: './island-create.html',
  styleUrl: './island-create.css',
})
export class IslandCreate {

  isVillagerChoicePopupVisible: WritableSignal<boolean> = signal(false);
  selectedVillagerSlot: WritableSignal<1 | 2 | null> = signal(null);
  villagerSlots: WritableSignal<(Village | null)[]> = signal([null, null]);
  
  searchQuery: WritableSignal<string> = signal('');
  filteredVillagers = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.villagers;
    return this.villagers.filter((v) => v.name.toLowerCase().includes(q));
  });

  sortedVillagerNames = [...villagerNames].sort((left, right) =>
    left.fr.localeCompare(right.fr, 'fr', { sensitivity: 'base' })
  );

  villagers: Village[] = this.sortedVillagerNames.map((name) => ({
    name: name.fr,
    iconPath: `/icons/villager_icons/${encodeURIComponent(name.en)}.png`,
    isAdded: signal(false),
    isFavorite: signal(false),
  }));

  addedVillagers = computed(() => this.villagerSlots().filter((villager): villager is Village => villager !== null));

  openVillagerPopup(slot: 1 | 2): void {
    this.selectedVillagerSlot.set(slot);
    this.isVillagerChoicePopupVisible.set(true);
  }

  closeVillagerPopup(): void {
    this.isVillagerChoicePopupVisible.set(false);
    this.selectedVillagerSlot.set(null);
  }

  addVillager(addedVillager: Village): void {
    const selectedSlot = this.selectedVillagerSlot();

    if (!selectedSlot) {
      return;
    }

    const slotIndex = selectedSlot - 1;
    const currentSlots = [...this.villagerSlots()];
    const isAlreadyUsedInAnotherSlot = currentSlots.some((villager, index) => index !== slotIndex && villager?.name === addedVillager.name);

    if (isAlreadyUsedInAnotherSlot) {
      return;
    }

    currentSlots[slotIndex] = addedVillager;
    this.villagerSlots.set(currentSlots);
    this.closeVillagerPopup();
  }

  isVillagerAdded(villager: Village): boolean {
    return this.villagerSlots().some((addedVillager) => addedVillager?.name === villager.name);
  }

  isVillagerDisabled(villager: Village): boolean {
    const selectedSlot = this.selectedVillagerSlot();

    if (!selectedSlot) {
      return false;
    }

    const selectedSlotIndex = selectedSlot - 1;

    return this.villagerSlots().some((addedVillager, index) => index !== selectedSlotIndex && addedVillager?.name === villager.name);
  }

  private readIslandForm() {
    const nameInput = document.getElementById('name-island') as HTMLInputElement | null;
    const islandName = nameInput?.value ?? '';

    const hemi = (document.querySelector('input[name="hemisphere"]:checked') as HTMLInputElement | null)?.value ?? '';
    const fruit = (document.querySelector('input[name="fruit"]:checked') as HTMLInputElement | null)?.value ?? '';

    const villagers = this.villagerSlots().map((v) => (v ? { name: v.name, iconPath: v.iconPath } : null));

    return { islandName, hemi, fruit, villagers };
  }

  async saveIslandToSupabase(): Promise<void> {
    try {
      const device = SupabaseService.getOrCreateDeviceFootprint();
      const existing = await SupabaseService.getAccountByDevice(device);

      const { islandName, hemi, fruit, villagers } = this.readIslandForm();

      let id: number;
      if (existing && existing.length > 0) {
        id = existing[0].id;
        // update account using correct column names
        await SupabaseService.updateAccount(id, { 'island-name': islandName, hemisphere: hemi, fruit, 'device-footprint': device });
        await SupabaseService.updateData(id, { villagers });
      } else {
        // create account without forcing id; let DB assign id
        const created = await SupabaseService.createAccount({ 'island-name': islandName, hemisphere: hemi, fruit, 'device-footprint': device });
        if (created && created.id) {
          id = created.id;
          await SupabaseService.createData({ id, villagers });
        } else {
          throw new Error('Failed to create account');
        }
      }

      console.log('Saved island to Supabase, id=', id);
    } catch (err) {
      console.error('Error saving island to Supabase', err);
    }
  }
}
