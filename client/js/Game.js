function findSpawn( x , y ){
	x=10;
	y=10;

}


function spawnPlayer(){
	val x, y;
	findSpawn(x,y);
	val user=new Player(x, y, true, 100);
	val fort = new Fort(x+window.innerWidth/2,y+window.innerHeight/2, user);		

}

