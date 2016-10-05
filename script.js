var s;
var Trello = {
		settings: {
			divs: 0,
			cards: 0,
			board: {},
			board_div: $("#board"),
	    parent_div: $("#draggable"),
			div_drop: $("#dropdown"),
			input: $("#input"),
	    text_area: $("#card")
	  },
		init: function() {
			s = this.settings;
		}
};

	function toggle_board() {
	    $(".overlay").toggle();
	}

	function create_board() {
		$(".overlay").toggle();

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
		input.class = "form-control";
		input.placeholder = "Add a card...";
		input.style.width = "120px";
		div.appendChild(input);

		$("#" + input.id).droppable({
				drop: function (event, ui) {
					console.log('this', $(this).parent()[0]);
					// $(this).closest('div').after(ui.helper[0]);
					console.log('dropped!', ui.helper[0]);
					var child = ui.helper[0];
					var parent = $(this).parent()[0];
					// parent.style.overflow = "hidden";
					// parent.style.width = "100%";
					child.style.left = "0px";
					child.style.top = "0px";

					// decrease old parent's height
					var parent_child = $(child).parent()[0];
					var height = parent_child.offsetHeight;
					height = height - 50;
					parent_child.style.height = height + "px";

					// increase new parent's height
					var height = parent.offsetHeight;
					height = height + 50;
					parent.style.height = height + "px";
					$(parent).append(child);
				}
		});

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
		 image.onclick = function() { please_close2(localStorage.divs) };


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

			var text_area =  document.createElement("textarea");
			text_area.value = card_text;
			text_area.style.width  = "120px";
			text_area.style.marginTop = "10px";
			text_area.style.zIndex = "1";
 			if (localStorage.cards) {
					// console.log('cards', localStorage.cards);
					localStorage.cards = Number(localStorage.cards) + 1;
			} else {
					localStorage.setItem('cards', 1 );
					// console.log('card', localStorage.cards);
			}

			text_area.id = "card" + localStorage.cards;
			text_area.name =  "card" + localStorage.cards;

			console.log('text_area', text_area);

			var height = parent_div.offsetHeight;
			height = height + 50;
			parent_div.style.height = height + "px";
			// div.appendChild(text_area);
			parent_div.appendChild(text_area);


			$("#"+text_area.id).draggable({
        cancel: ""
      });

	}

	function please_close()
	{
		$("#dropdown").toggle();
		document.getElementById('list').value = '';
	}

	function please_close2(id)
	{
		//console.log(id);
		$('#dropdown'+id).toggle();
		document.getElementById('input'+id).value = '';

	}
