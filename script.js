
	$(document).ready(function(){
			localStorage.clear();
	});

	function new_board() {
	    $(".overlay").toggle(); // show/hide the overlay
	}

	function create_board() {
		$(".overlay").toggle(); // show/hide the overlay

		var title = document.getElementById('title').value;
		// console.log(title);
		var board = {};
		board.title = title;
	  localStorage.setItem('board', board);

	  $("#board h2").html(title);

	  $("#board").toggle();

	  document.getElementById("list").addEventListener("click", function(){
		    $("#dropdown").toggle();
		});
	}

	function create_list()
	{
		var list_name = document.getElementById('list').value;
		$("#dropdown").toggle();
		document.getElementById('list').value = '';
		// create a list on the right
		var div = document.createElement("div");
		div.style.width = "150px";
		div.style.height = "100px";
		div.style.padding = "10px";
		div.style.marginTop = "50px";
		div.style.background = "white";
		div.style.color = "black";

		if (localStorage.divs) {
				localStorage.divs = Number(localStorage.divs) + 1;
				//console.log('divs2', localStorage.divs);
		} else {
				localStorage.setItem('divs', 1 );
				// console.log('divs1', localStorage.divs);
		}
		div.id = "draggable"+localStorage.divs;
		div.innerHTML = list_name;

		document.body.appendChild(div);
		$("#draggable"+localStorage.divs).draggable();

		// create input
		var input = document.createElement("input");
		input.type = "text";
		input.id = "input"+ localStorage.divs;
	// 	$("#input"+ localStorage.divs).droppable({
	// 	 drop: function( event, ui ) {
	// 		 $( this )
	// 			 console.log('dropped!');
	// 	 }
	//  });
		input.class = "form-control";
		input.placeholder = "Add a card...";
		input.style.width = "120px";
		div.appendChild(input);

		// create a dropdown div
		var	div_d = document.createElement("div");
		div_d.style.width = "150px";
		div_d.style.height = "30px";
		div_d.id = "dropdown" + localStorage.divs;
		div.appendChild(div_d);


		 // create a save button and image
		 var button = document.createElement("input");
		 button.type = "button";
		 button.className = "btn btn-success";
		 button.value = "Add";
		 button.onclick = function(){ create_card(div.id, input.id, div_d.id)};

		 var image = document.createElement("img");
		 image.src = "https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-22-128.png";
		 image.style.width = "30px";
		 image.style.height = "30px";
		 image.onclick = function() { please_close2(div_d.id) };


		 $("#dropdown"+localStorage.divs).toggle();
		 document.getElementById(input.id).addEventListener("click", function(){
			$("#"+div_d.id).toggle();
		 });
		 div_d.appendChild(button);
		 div_d.appendChild(image);
	}


	function create_card(div, input, div_d)
	{
			$("#"+div_d).toggle();

			//  console.log('div id', div);
			//  console.log('input id', input);

			var parent_div = document.getElementById(div);
			var card_text = document.getElementById(input).value;

			//console.log('card_text', card_text);
			document.getElementById(input).value = '';

			// create a list on the right
			// var div = document.createElement("div");
			// div.style.width = "150px";
			// div.style.height = "100px";
			// div.style.background = "black";
			// div.style.marginTop = "10px";



			var text_area =  document.createElement("textarea");
			text_area.value = card_text;
			text_area.style.width  = "120px";
			text_area.style.marginTop = "10px";

 			if (localStorage.cards) {
					// console.log('cards', localStorage.cards);
					localStorage.cards = Number(localStorage.cards) + 1;
			} else {
					localStorage.setItem('cards', 1 );
					// console.log('card', localStorage.cards);
			}

			text_area.id = "card" + localStorage.cards;
			$("#"+text_area.id).draggable({
          cancel: ""
      });
			// div.id = "card" + localStorage.cards;
			// div.appendChild(text_area);
			// console.log('text_area', text_area);

			var height = parent_div.offsetHeight;
			height = height + 100;
			parent_div.style.height = height + "px";
			// div.appendChild(text_area);
			parent_div.appendChild(text_area);

	}

	function please_close()
	{
		$("#dropdown").toggle();
		document.getElementById('list').value = '';
	}

	function please_close2(id)
	{
		//console.log(id);
		$('#'+id).toggle();
	}
