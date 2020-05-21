var plone=prompt("WELCOME! \n Enter name of Player One!")
var plonec='rgb(240, 140, 41)'
var pltwo=prompt("WELCOME! \n Enter name of Player Two!")
var pltwoc='rgb(33, 190, 237)'
var table=$('table tr')
var gamerun=true

//function to change color
function changecolor(rol,col, c){
table.eq(rol).find('td').eq(col).find('button').css('background-color',c)
}

//function to return color of a button
function retcol(rol,col){
  return table.eq(rol).find('td').eq(col).find('button').css('background-color')
}

//function to find and color the required block
function checkavai(col,cc){
  var c=retcol(5,col)
  for (var i = 5; i>-1; i--) {
    if (retcol(i,col)=='rgb(128, 128, 128)')
    {
    changecolor(i,col,cc)
    return
    }
  }
}

//function to check any consecutive 4 chips
function wincheck(one, two, three, four)
{
  if(one==two && two==three && one==four && one!=='rgb(128, 128, 128)' && one!==undefined)
  return true
  return false
}

// horizontal check
function horicheck(){
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 4; j++) {
      if(wincheck(retcol(i,j),retcol(i,j+1),retcol(i,j+2),retcol(i,j+3)))
      return true
    }
  }
  return false
}

// vertical check
function verticheck(){
  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < 3; i++) {
      if(wincheck(retcol(i,j),retcol(i+1,j),retcol(i+2,j),retcol(i+3,j)))
      return true
    }
  }
  return false
}

// diagonal check
function diacheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (wincheck(retcol(row,col), retcol(row+1,col+1) ,retcol(row+2,col+2), retcol(row+3,col+3))) {
        return true;
      }else if (wincheck(retcol(row,col), retcol(row-1,col+1) ,retcol(row-2,col+2), retcol(row-3,col+3))) {
        return true;
      }else {
        continue;
      }
    }
  }
  return false
}



$('h3').text(plone + ": START THE GAME!")
$('button').click(function(){
  var pp=$(this).closest("td").index()
  if(gamerun===true)
  {
    $('h3').text(pltwo + " It's your turn!")
    checkavai(pp,plonec)
    gamerun=false
    if(horicheck() || verticheck() || diacheck())
    {$('h3').text(plone+ " is winner! Refresh to start new match")}

  }
  else
  {
    $('h3').text(plone + " It's your turn!")
    checkavai(pp,pltwoc)
    gamerun=true
    if(horicheck() || verticheck() || diacheck())
    {$('h3').text(pltwo +" is winner! Refresh to start new match")}
    }

})
