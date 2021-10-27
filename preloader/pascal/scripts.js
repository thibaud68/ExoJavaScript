/*

EXERCICE : SUIVI DU CHARGEMENT DE LA PAGE / APPARITION "EN DOUCEUR" UNE FOIS CHARGÉE
------------------------------------------------------------------------------------
La page comporte un certain nombre d'images à charger, ainsi qu'un "masque" temporaire comportant une barre de chargement.
Dans l'état actuel, la barre ne bouge pas et le masque ne disparaît jamais : rien n'est surveillé concernant l'avancée du chargement.

Le but :
• obtenir un suivi visuel approximatif du volume de données chargées (nous nous concentrerons sur les images) via la barre de chargement
• faire disparaître le masque temporaire une fois toutes les images chargées

Résultat attendu : http://www.auer404.com/cours/exercices/preloader/

*/

/* 1) Préparation de quelques variables globales. Il nous faut :

-> un tableau de tous les éléments de type <img /> (utiliser document.getElementsByTagName)

-> le nombre total d'images à charger (à déduire du tableau ci-dessus)

-> un compteur pour les images chargées, initialisé à 0 au départ.

*/

var les_images = document.getElementsByTagName("img");

var nombre_total_images = les_images.length;

var nombre_images_chargees = 0;

/////////////////////////////////////////////////////////

/* 2) Une fonction à exécuter à chaque fois qu'une nouvelle image est chargée */

function an_image_is_loaded() {
    
    nombre_images_chargees++;
    
    update_loadbar();
    
    if (nombre_images_chargees >= nombre_total_images) {
        
        // toutes les images sont chargées
        everything_is_loaded();
        
    }
    
    /*
    
    -> Incrémenter le compteur d'images chargées
    
    -> Temporaire : Afficher dans la console le nombre d'images chargées
    
    -> Préparer un test : le nombre d'images chargées est-il supérieur ou égal au nombre total à charger ?
        Si oui, c'est à ce moment que l'on pourra faire disparaître le masque (voir étape 3)
        Temporairement, on peut afficher un message dans la console indiquant que tout est prêt.
    
    */
    
}

/* 2.5) Pour chaque image (donc chaque élément du tableau préparé au début) :

-> Attacher la fonction à l'événement load.

*/

for (var i = 0; i < nombre_total_images; i++) {
    
    les_images[i].addEventListener("load", an_image_is_loaded);
    
}

/////////////////////////////////////////////////////////

/* 3) Fonction à exécuter une fois toutes les images chargées */

function everything_is_loaded() {
    
    document.body.classList.add("loaded");
     
    setTimeout(function(){
    document.getElementById("preload_mask").classList.add("destroyed");
        
    },2000);
    
    /*
    
    -> Ajouter la classe "loaded" au body (aura pour effet de rendre transparent le masque, en fondu, et de rendre la page scrollable)
    
    -> Après 2 secondes (donc 2000 millisecondes), correspondant à la durée de la transition css "opacity" du masque,
    ajouter la classe "destroyed" au masque (id "preload_mask"). Aura pour effet de faire disparaître totalement le masque.
    Rappel : utiliser setTimeout() pour une exécution temporisée.
    
    Pour bien se rendre compte si cet ajout de classe a fonctionné, on doit pouvoir constater une animation au survol des images.
    Celle-ci ne fonctionnera pas tant que le masque sera juste transparent car il reste placé en-dessus du reste et bloque tout survol.
    
    */

}

/* 3.5) Appeler cette fonction au bon moment (voir étape 2) */

/////////////////////////////////////////////////////////

/* 4) Fonction pour faire évoluer la barre de chargement */

function update_loadbar() {
    
    var pourcent = Math.round(nombre_images_chargees / nombre_total_images * 100);
    
    document.getElementById("loaded_percent").innerHTML = pourcent;
    
    document.getElementById("loadbar").style.width = pourcent + "%";
    
    /*
    
    -> Préparer une variable contenant le pourcentage chargé par rapport au total à charger.
    La formule : nombre images chargés / nombre total images * 100
    On peut rendre cette valeur plus propre en l'arrondissant. Rappel : Math.round()
    
    -> Remplacer le contenu de l'élément d'identifiant "loaded_percent" par cette variable
    
    -> Donner à l'élément d'identifant "loadbar" une largeur égale à cette variable + "%"
    
    */
    
}

/* 4.5) Appeler cette fonction à chaque fois qu'une image est chargée (voir étape 2) */