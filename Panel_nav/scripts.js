/*

EXERCICE : NAVIGATION PANNEAU PAR PANNEAU AVEC SUIVI / CHAPITRAGE
-----------------------------------------------------------------
La page est constituée de différents panneaux disposés à la suite. Le but est de faire fonctionner un système de "puces", permettant :
• d'avoir un retour visuel concernant quel panneau est à l'écran via une surbrillance (classe "current") de la puce correspondante
• de naviguer directement vers un panneau précis en cliquant sur la puce correspondante

Résultat attendu : http://www.auer404.com/cours/exercices/panel-nav

*/


/* 1) Il va nous falloir accéder de manière globale à deux tableaux :

-> La liste des éléments de classe "panel" (panneaux)
-> La liste des éléments de classe "nav_elem" (puces / navigation)

À stocker dans deux variables qui seront ensuite utilisées dans nos fonctions.

*/var panels = document.getElementsByClassName('panel');


for( var i = 0; i < panels.length; i++){// boucle for pour créer la liste nav_elems

        var random_number = Math.round(Math.random() * 1000);//Nombre aléatoire entre 0 et 1000
    panels[i].style.backgroundImage= "url(https://picsum.photos/800?r=" + random_number+")";

    var new_elem = document.createElement("a");


    //new_elem.href = "#";
    new_elem.setAttribute("href","#"); //ou new_elem.href = "#"
    new_elem.className = "nav_elem";

    new_elem.innerHTML = i + 1;

    new_elem.attached_panel = panels[i];//Pour "vérouiller" le bon panneau correspondant au nav_elem

      new_elem.addEventListener("click", function() { goto_panel(this.attached_panel) } );

      document.getElementById("navigation").appendChild(new_elem);

}
var nav_elems = document.getElementsByClassName('nav_elem');

/* 2) Ce qui se passe au scroll peut être géré dans une fonction. Le but :

-> dé-sélectionner tous les éléments de classe "nav_elem"
-> déterminer quel panneau est à l'écran et re-sélectionner le "nav_elem" correspondant

*/


function update_scroll() {

console.log(this);
var scroll_Y = window.scrollY ;
if (scroll_Y < 0){return; } //Pour Safari : ici  return est juste utilisé pour interrompre

var curr_panel_index;

    
   for (var i = 0; i < nav_elems.length; i++){
    var n_e = nav_elems[i];// Optionnel , pour raccourci

    n_e.classList.remove("current");
//n.e.classList.add("nouvelleclasse");//ajoute une nouvelle classe
    if(scroll_Y >= panels[i].offsetTop){
            curr_panel_index = i;
    }

}
    nav_elems[curr_panel_index].classList.add("current");
  /*
    
    -> Initialiser une variable (vide). Elle servira à stocker temporairement l'indice, dans le tableau des "panel", de celui qui est à l'écran.
    
    -> Pour tous les éléments de classe "nav_elem" (utiliser une boucle for) :
        
        • Retirer la classe "current" de l'élément
        
        • Comparer le positionnement vertical du panneau correspondant (son attribut offsetTop) et la distance scrollée dans la fenêtre. Si le scroll est supérieur ou égal à la position du panneau, on considère ce dernier comme étant à l'écran. On peut donc stocker son indice dans la variable initialisée en début de fonction.
        
        Rappel sur les indices :
        
        var indice_specifique;
        
        for (var i = 0; i < tableau1.length; i++) {
        
            var elem_du_tableau_1 = tableau1[i];
            var elem_de_meme_indice_dans_autre_tableau = autre_tableau[i];
        
            if (condition) {
            
                indice_specifique = i;
            
            }
        
        }
        
    -> Après la boucle for, on peut ajouter la classe "current" au bon panneau : celui dont l'indice correspond à celui stocké la dernière fois que la condition testée (scroll / position panneau) a été vérifiée dans la boucle for.
    
    */
    
}
window.addEventListener("scroll",update_scroll);//quel type d'évènement on est censé ecouter
//window.addEventListener("nom-de-levenement",function(){update_scroll()});

update_scroll();
/* 2.5) La fonction :

    -> Peut être associée à l'événement scroll de la fenêtre
    -> Peut être exécutée immédiatement (pour qu'une puce soit sélectionnée dès l'arrivée sur la page)

*/

/////////////////////////////////////////////////////////

/* 3) Au clic sur une puce (élément de classe "nav_elem"), il faudrait un scroll automatique jusqu'au panneau correspondant. Préparer une fonction :

*/

function goto_panel(panel) {
    
    /* Cette instruction fera l'affaire. ATTENTION : c'est en jQuery
      
    */
    $('html, body').animate({
        scrollTop: $( panel ).offset().top
    }, 500 );
    //window.scroll(x-coord,y-coord) A tester.
}
/*for (var i = 0;i < nav_elems.length;i++){//boucle for détermine fonction au clique

    var n_e = nav_elems[i];

  // n_e.addEventListener("click", function () { goto_panel(panels[i]) });Non : la variable i ne restera pas à la bonne valeur
    
     n_e.attached_panel = panels[i]; //propriété personalisée(la propriété est attaché à un objet) pas de var ou de let car c'est une propriété

    n_e.addEventListener("click", function() { goto_panel(this.attached_panel) } );// function() fonction anonyme

}*//*for( var i = 0; i < panels.length; i++){

    var new_elem = document.createElement("a");

    //new_elem.href = "#";
    new_elem.setAttribute("href","#"); //ou new_elem.href = "#"
    new_elem.className = "nav_elem";
    new_elem.innerHTML = i + 1;

    new_elem.attached_panel = panels[i];//Pour "vérouiller" le bon panneau correspondant au nav_elem

      new_elem.addEventListener("click", function() { goto_panel(this.attached_panel) } );

      document.getElementById("navigation").appendChild(new_elem);

}*/

/* 3.5) Il faut attacher à l'événement clic de chaque élément de classe "nav_elem" cette fonction, avec le bon paramètre (le panneau correspondant).

-> Dans une boucle for() pour passer en revue les nav_elems,
    
    • il faut commencer par stocker, comme une nouvelle propriété personnalisée du nav_elem traité, une référence au panneau correspondant
    
    tableau1[indice].propriete_personnalisee = tableau2[indice]
    
    • puis gérer l'événement clic.
    Pour pouvoir passer un paramètre, on ne peut pas simplement désigner la fonction goto_panel, il faut l'encapsuler dans une fonction anonyme
    
    function() { goto_panel(le_bon_panneau) }
    
    et ici le_bon_panneau correspond à la propriété personnalisée préparée à l'instant (normalement accessible via this.cette_propriete_personnalisee)

*/

/////////////////////////////////////////////////////////

/* 4) Amélioration - permettre au script de générer lui-même les puces / éléments de navigation en fonction du nombre de panneaux.

-> Dans le HTML, vider le contenu de la div "#navigation" et éventuellement ajouter quelques div ".panel" à la suite de ceux en place

-> Dans le JS, supprimer / mettre en commentaire la boucle for() traitée à l'étape 3.5 (la gestion des événements clic se fera dans le bloc que nous allons ajouter)

-> Pour chaque panneau :

    • Préparer un élément <a></a> (via document.createElement)
    • Lui donner "#" en attribut href
    • Lui donner "nav_elem" en attribut className
    • Y insérer comme contenu le numéro correspondant (indice traité + 1)
    • Lui donner comme propriété personnalisée la référence au panneau qui lui correspond (voir étape 3.5)
    • Attacher à son événement clic la fonction goto_panel, bien paramétrée (voir étape 3.5)
    • L'insérer dans la div "#navigation"
    rappel : le_parent_cible.appendChild(le_nouvel_element)

*/