/*

EXERCICE : CHAMP TEXTE AUTO-ÉTIRABLE (Adapte sa hauteur à son contenu)
----------------------------------------------------------------------

Pour un champ texte, on peut récupérer l'attribut scrollHeight, correspondant à la hauteur prise par son contenu.
Il pourrait sembler suffisant, lorsque du texte est saisi dans ce champ, d'en "forcer" la hauteur pour qu'elle corresponde à cet attribut.
En fait, cela ne fonctionne que partiellement.

Une manière plus fiable consiste à :
• avoir à disposition, pour le champ texte, un élément "clone" (invisible)
• recopier en permanence (à chaque saisie dans le champ) le contenu du champ dans ce clone pour en faire varier la hauteur
• récupérer cette hauteur et l'appliquer au champ

Le clone ne doit pas être un champ texte. Une div, par exemple, assure un bon comportement pour la hauteur : le contenu de la div influera bien sur la hauteur de celle-ci.

Dans le CSS on peut remarquer certaines règles destinées à faire correspondre au mieux le volume pris par le même contenu dans le champ et son clone (largeur, padding et bordure, font-size, font-family, line-height sont uniformisés).

Résultat attendu : http://www.auer404.com/cours/exercices/autostretch/

*/


/* 1) Il va nous falloir manipuler le champ et son clone. Ils peuvent être stockés dans deux variables */

var champ = document.getElementById("autostretch_field");
var clone = document.getElementById("autostretch_field_clone");

/* 2) La fonction */

function update_autostretch() {
    
    clone.innerHTML = nl2br(champ.value);
    
    if (clone.offsetHeight >= 200) {
    
    champ.style.height = clone.offsetHeight + "px";
        
    } else {
     
        champ.style.height = ""; // reprendra la hauteur fixée par CSS
        
    }
    
    /*
    
    -> remplacer le contenu du clone par la valeur (contenu édité) du champ.
    ATTENTION : si le champ contient des retours à la ligne, ceux-ci ne seront pas reproduits dans le contenu du clone, ce qui faussera la hauteur obtenue pour le clone
    Mais heureusement, nous avons plus bas une fonction nl2br() pour assurer la conversion des retours à la ligne en balises <br/> et ainsi les retrouver dans le contenu (HTML) du clone.
    
    -> si la hauteur du clone est supérieure ou égale à un seuil minimal (à définir) : donner au champ la même hauteur que celle du clone
    
    -> sinon, supprimer toute stylisation "forcée" concernant la hauteur du champ (ce qui le ramènera à sa taille par défaut)
    
    */
    
}

/* 2.5) Cette fonction doit être appelée dès que le contenu du champ a été modifié :

-> lorsque le champ détecte qu'une touche a été relachée
-> après un léger délai, lorsque le champ a réceptionné du contenu copié-collé


*/

//function test_evenement() {
//    document.body.style.backgroundColor = "red";
//}
//
//function test_evenement2() {
//    setTimeout(function(){
//    alert(champ.value);
//    },100);
//}

champ.addEventListener("keyup",update_autostretch);
champ.addEventListener("paste", function(){
    setTimeout(update_autostretch , 100); // setTimeout car on a besoin de temporiser pour garantir que la valeur du champ est à jour.
});


/* À UTILISER PLUS HAUT : Adaptation de la fonction nl2br() de PHP, servant à convertir, pour une chaîne, les retours à la ligne en leur équivalent HTML. Sans cela, si l'on cherche par exemple à afficher en HTML le contenu d'un champ texte, les retours à la ligne n'y seront pas pris en compte. */

function nl2br(str) {
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
}


/* 3) Pour compléter l'effet, rendre le clone invisible (une ligne commentée à rétablir dans le CSS) */