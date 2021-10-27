/*

EXERCICE : STICKY MENU
----------------------

Sur cette page HTML, le menu est calé par défaut en bas d'un panneau d'intro (donc en bas de la fenêtre car ce panneau en reprend la hauteur). Lorsqu'on scrolle pour arriver aux contenus, le menu finit par quitter l'écran.

L'objectif est de le forcer, une fois arrivé en haut de la fenêtre, à s'y fixer pour toujours rester disponible.

Pour cela il faudra, en fonction de la distance scrollée dans la fenêtre, donner au menu une classe ("sticky", déjà préparée dans le CSS) le faisant notamment passer de position:absolute à position:fixed.

Résultat attendu : http://www.auer404.com/cours/exercices/sticky-menu/

*/


// 1) On aura besoin de manipuler l'élément "menu". Le stocker dans une variable.

var menu = document.getElementById("menu");


// 2) La fonction qui traitera le changement de classe du menu en fonction du scroll :

function update_menu() {
    
    var scroll_Y = window.scrollY;
    var hauteur_fenetre = window.innerHeight;
    var hauteur_menu = menu.offsetHeight;
    
    if (scroll_Y > hauteur_fenetre - hauteur_menu) {
        
        menu.classList.add("sticky");
        // On n'utilise pas .className = "sticky" ni .setAttribute("class", "sticky") car ces manières de faire remplacent tout l'attribut "class"
        
    } else {
        
        menu.classList.remove("sticky");
        
    }
    
    /*
    
    -> Récupérer trois données qu'il va nous falloir :
    
        - distance scrollée dans la fenêtre
        - hauteur de la fenêtre (window.innerHeight)
        - hauteur du menu (sa propriété offsetHeight)
        
    -> Si la distance scrollée est supérieure à une hauteur de fenêtre moins la hauteur du menu,
       ajouter la classe "sticky" au menu.
       
    -> Faire en sorte de retirer cette classe dans le cas contraire.
    
    */
    
}

// 3) Attacher la fonction à l'événement scroll de la fenêtre

// Approche via écouteurs d'événements :

window.addEventListener("scroll", update_menu);
//window.addEventListener("scroll", autrefonction); // c'est possible, car écouteurs d'événement cumulables.

// Approche via la méthode onscroll() de la fenêtre :

//window.onscroll = update_menu;
//window.onscroll = autrefonction; // "écrase" l'appel à update_menu

// window.onscroll = function() { update_menu(); autrefonction(); }  // ça fonctionne


/* Les classes - point flexibilité

<div class = "classe1 classe2 classe3"></div>

document.querySelector(".classe1.classe2.classe3");
équivalent à :
document.querySelectorAll(".classe1.classe2.classe3")[0]; (retournera toujours une liste)
ou encore :
document.getElementsByClassName("classe1 classe2 classe3")[0]; (retournera toujours une liste)

attribut class -> "classe1 classe2 classe3"
className -> "classe1 classe2 classe3"

à partir de là :

- setAttribute("class","nouvelleclasse") -> attribut classe = "nouvelleclasse" / classList = ["nouvelleclasse"]

- .classList.add("nouvelleclasse") -> attribut classe = "classe1 classe2 classe3 nouvelleclasse" / classList complète (4 éléments)

• si on veut ajouter nouvelleclasse via className ou setAttribute("class","nouvelleclasse"),
il faudra remplacer par "classe1 classe2 classe3 nouvelleclasse". -> il faut gérer l'ensemble de la liste des classes.

• si on passe par .classList.add(), on pourra se contenter de add("nouvelleclasse")

classList -> ["classe1", "classe2", "classe3"] (tableau)

Au final, l'attribut "class" correspond à l'ensemble de la classList, en une seule chaine, séparée par des espaces.

*/


