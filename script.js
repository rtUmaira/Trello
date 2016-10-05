	var Trello = {
			divs: 0,
			cards: 0,
			toggle_board: function() {
					$(".overlay").toggle();
			 },
			create_board: function() {
				 $(".overlay").toggle();

				 var title = document.getElementById('title').value;
				 // console.log(title);
				 $("#board h2").html(title);
				 $("#board").toggle();

				 document.getElementById("list").addEventListener("click", function(){
						 $("#dropdown").toggle();
				 });
 			 },
			 create_list: function()
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
				 div.style.marginTop = "10px";

			   if (this.divs >= 1) {
			       this.divs = this.divs + 1;
			      //  console.log('divs2', this.divs);
			   } else {
			       this.divs = 1;
			      //  console.log('divs1', this.divs);
			   }
			   div.id = "draggable" + this.divs;
			   div.innerHTML = list_name;

			   document.body.appendChild(div);
			   $("#draggable" + this.divs).draggable();

			   // create input
			   var input = document.createElement("input");
			   input.type = "text";
			   input.id = "input" + this.divs;
			   input.class = "form-control";
			   input.placeholder = "Add a card...";
			   input.style.width = "120px";
			   div.appendChild(input);

			   $("#" + input.id).droppable({
			       drop: function (event, ui) {
			        //  console.log('this', $(this).parent()[0]);
			         // $(this).closest('div').after(ui.helper[0]);
			        //  console.log('dropped!', ui.helper[0]);
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
			   div_d.id = "dropdown" + this.divs;
			   div.appendChild(div_d);

			    // create a save button and image
			    var button = document.createElement("input");
					button.type = "button";
			    button.className = "btn btn-success";
			    button.value = "Add";
					// console.log('this', this);
			    // button.onclick = function(){ this.create_card(div.id, input.id, div_d.id)};
					var that = this;
					button.onclick = function() {	that.create_card(div.id, input.id, div_d.id)};
			    var image = document.createElement("img");
			    image.src = "https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-22-128.png";
			    image.style.width = "30px";
			    image.style.height = "30px";
			    image.onclick = function() { that.please_close2(this.divs) };


			    $("#dropdown" + this.divs).toggle();
			    document.getElementById(input.id).addEventListener("click", function(){
			     		$("#" + div_d.id).toggle();
			    });
			    div_d.appendChild(button);
			    div_d.appendChild(image);
			 },
			 create_card: function(div, input, div_d)
			 {
			     $("#" + div_d).toggle();

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
					 if (this.cards >= 1) {
				       this.cards = this.cards + 1;
				      //  console.log('cards2', this.cards);
				   } else {
				       this.cards = 1;
				      //  console.log('cards1', this.cards);
				   }

			     text_area.id = "card" + this.cards;
			     text_area.name =  "card" + this.cards;

			    //  console.log('text_area', text_area);

			     var height = parent_div.offsetHeight;
			     height = height + 50;
			     parent_div.style.height = height + "px";
			     // div.appendChild(text_area);
			     parent_div.appendChild(text_area);


			     $("#" + text_area.id).draggable({
			       cancel: ""
			     });

			 },
			 please_close: function ()
			 {
			   $("#dropdown").toggle();
			   document.getElementById('list').value = '';
			 },
			 please_close2: function (id)
			 {
			   //console.log(id);
			   $('#dropdown'+id).toggle();
			   document.getElementById('input'+id).value = '';
			 }
	};
