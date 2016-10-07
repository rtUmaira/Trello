(function() {

	this.Trello = function() {
		var divs = 0;
		var cards = 0;
		// var options = {};
		var defaults = {
			list: {
				axis: "",
				containment: "",
				cursor: ""
			},
			card: {
				axis: "",
				containment: "",
				cursor: ""
			}
		}
		// Create options by extending defaults with the passed in arugments
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(defaults, arguments[0]);
			// console.log('options', this.options);
		}
	}

	// public methods

	Trello.prototype.init = function () {
		// overlay div
		var div_o = document.createElement("div");
		div_o.className = "overlay";
		document.body.appendChild(div_o);

		var div_f = document.createElement("div");
		div_f.className = "form-note";
		div_o.appendChild(div_f);

		var label = document.createElement("label");
		label.style.color = "white";
		label.innerHTML = "Title";

		var input_t = document.createElement("input");
		input_t.type = "text";
		input_t.id = "title";
		input_t.className = "form-control";

		var button = document.createElement("button");
		button.style.marginTop = "10px";
		button.style.marginLeft = "100px";
		button.className = "btn btn-success";
		button.type = "submit";
		button.innerHTML = "Submit";
		var that = this;

		// console.log('that.options', that.options);
		button.onclick = function() {	create_board.call()};

		var image = document.createElement("img");
		image.style.marginTop = "10px";
		image.src = "https://www.pledgesports.org/wp-content/themes/pledge_v2.3/img/close.png";
		image.style.width = "50px";
		image.style.height = "30px";
		image.onclick = function() {  $(".overlay").toggle(); };

		div_f.appendChild(label);
		div_f.appendChild(input_t);
		div_f.appendChild(button);
		div_f.appendChild(image);

		$(".overlay").toggle();

		// board div
		var div_b = document.createElement("div");
		div_b.id = "board";
		div_b.style.display = "none";

		var h2 = document.createElement("h2");

		var input_l = document.createElement("input");
		input_l.type = "text";
		input_l.id = "list";
		input_l.className = "form-control";
		input_l.placeholder = "Add a list...";
		input_l.style.width = "150px";

		var div_d = document.createElement("div");
		div_d.style.display = "none";
		div_d.id = "dropdown";

		document.body.appendChild(div_b);
		div_b.appendChild(h2);
		div_b.appendChild(input_l);

		var button2 = document.createElement("button");
		button2.className = "btn btn-success";
		button2.type = "submit";
		button2.onclick = function() { create_list.call(that) };
		button2.innerHTML = "Save";

		var image2 = document.createElement("img");
		image2.style.width = "30px";
		image2.style.height = "30px";
		image2.src = "https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-22-128.png";
		image2.onclick = function() { please_close.call() };


		div_d.appendChild(button2);
		div_d.appendChild(image2);

		div_b.appendChild(div_d);
	};

	function create_board() {
		$(".overlay").toggle();

		var title = document.getElementById('title').value;
		// console.log(title);
		$("#board h2").html(title);
		$("#board").toggle();

		document.getElementById("list").addEventListener("click", function(){
			$("#dropdown").toggle();
		});
	}

	function create_list() {
		var list_name = document.getElementById('list').value;
		$("#dropdown").toggle();
		document.getElementById('list').value = '';

		// create a list on the right
		var div = document.createElement("div");
		div.className = "list";

		if (this.divs >= 1) {
			this.divs = this.divs + 1;
			//  console.log('divs2', this.divs);
		} else {
			this.divs = 1;
			//  console.log('divs1', this.divs);
		}
		div.id = "draggable" + this.divs;
		// console.log('divs', this.divs);
		// console.log('options', this.options);
		div.innerHTML = list_name;

		document.body.appendChild(div);
		if (this.options.list.axis && this.options.list.containment && this.options.list.cursor) {
			console.log('div1');
			$("#draggable" + this.divs).draggable({
				axis: this.options.list.axis,
				containment: this.options.list.containment,
				cursor:  this.options.list.cursor
			});
		} else if (this.options.list.axis && !this.options.list.containment &&  !this.options.list.cursor) {
			console.log('div2');
			$("#draggable" + this.divs).draggable({
				axis: this.options.list.axis
			});
		} else if (this.options.list.axis && !this.options.list.containment && !this.options.list.cursor) {
			console.log('div3');
			$("#draggable" + this.divs).draggable({
				axis: this.options.list.axis
			});
		} else if (this.options.list.axis && this.options.list.containment && !this.options.list.cursor) {
				console.log('div4');
				$("#draggable" + this.divs).draggable({
					axis: this.options.list.axis,
					containment:  this.options.list.containment
				});
		} else if (this.options.list.axis && !this.options.list.containment && this.options.list.cursor) {
			console.log('div5');
			$("#draggable" + this.divs).draggable({
				axis: this.options.list.axis,
				cursor:  this.options.list.cursor
			});
		} else if (!this.options.list.axis && this.options.list.containment && this.options.list.cursor) {
			console.log('div6');
			$("#draggable" + this.divs).draggable({
				containment: this.options.list.containment,
				cursor: this.options.list.cursor
			});
		} else if (!this.options.list.axis && this.options.list.containment && !this.options.list.cursor) {
			console.log('div7');
			$("#draggable" + this.divs).draggable({
				containment: this.options.list.containment
			});
		} else if (!this.options.list.axis && !this.options.list.containment && !this.options.list.cursor) {
			console.log('div8');
			$("#draggable" + this.divs).draggable();
		}

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
		button.onclick = function() {	create_card.call(that, div.id, input.id, div_d.id)};
		// console.log('that.divs', that.divs);
		var image = document.createElement("img");
		image.src = "https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-22-128.png";
		image.style.width = "30px";
		image.style.height = "30px";
		image.onclick = function() { please_close2(that.divs) };


		$("#dropdown" + this.divs).toggle();
		document.getElementById(input.id).addEventListener("click", function()		{
			$("#" + div_d.id).toggle();
		});
		div_d.appendChild(button);
		div_d.appendChild(image);
	}

	function create_card(div, input, div_d)	{
		$("#" + div_d).toggle();

		//  console.log('div id', div);
		//  console.log('input id', input);

		var parent_div = document.getElementById(div);
		var card_text = document.getElementById(input).value;

		//console.log('card_text', card_text);
		document.getElementById(input).value = '';

		var text_area =  document.createElement("textarea");
		text_area.value = card_text;
		text_area.className = "card";
		if (this.cards >= 1) {
			this.cards = this.cards + 1;
			 console.log('cards2', this.cards);
		} else {
			this.cards = 1;
			 console.log('cards1', this.cards);
		}

		text_area.id = "card" + this.cards;
		text_area.name =  "card" + this.cards;

		//  console.log('text_area', text_area);

		var height = parent_div.offsetHeight;
		height = height + 50;
		parent_div.style.height = height + "px";
		// div.appendChild(text_area);
		parent_div.appendChild(text_area);

		// console.log('options111', this.options);
		if (this.options.card.axis && this.options.card.containment && this.options.card.cursor) {
			console.log('div1');
			$("#" + text_area.id).draggable({
				cancel: "",
				axis: this.options.card.axis,
				containment: this.options.card.containment,
				cursor:  this.options.card.cursor
			});
		} else if (this.options.card.axis && !this.options.card.containment &&  !this.options.card.cursor) {
			console.log('div2');
			$("#" + text_area.id).draggable({
				cancel: "",
				axis: this.options.card.axis
			});
		} else if (this.options.card.axis && this.options.card.containment && !this.options.card.cursor) {
			console.log('div3');
			$("#" + text_area.id).draggable({
				cancel: "",
				axis: this.options.card.axis,
				containment: this.options.card.containment
			});
		} else if (this.options.card.axis && !this.options.card.containment && this.options.card.cursor) {
				console.log('div4');
				$("#" + text_area.id).draggable({
					cancel: "",
					axis: this.options.card.axis,
					cursor:  this.options.card.cursor
				});
		} else if (!this.options.card.axis && this.options.card.containment && this.options.card.cursor) {
			console.log('div5');
			$("#" + text_area.id).draggable({
				cancel: "",
				containment: this.options.card.containment,
				cursor:  this.options.card.cursor
			});
		} else if (!this.options.card.axis && this.options.card.containment && !this.options.card.cursor) {
			console.log('div6');
			$("#" + text_area.id).draggable({
				cancel: "",
				containment: this.options.card.containment
			});
		} else if (!this.options.card.axis && !this.options.card.containment && this.options.card.cursor) {
			console.log('div7');
			$("#" + text_area.id).draggable({
				cancel: "",
				cursor: this.options.card.cursor
			});
		} else if (!this.options.card.axis && !this.options.card.containment && !this.options.card.cursor) {
			console.log('div8');
			$("#" + text_area.id).draggable({
				cancel: ""
			});
		}

	}

	function please_close() {
		$("#dropdown").toggle();
		document.getElementById('list').value = '';
	}

	function please_close2(id) {
		// console.log('id', id);
		$('#dropdown'+id).toggle();
		document.getElementById('input'+id).value = '';
	}

	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}

}());

var trello = new Trello({
 // set list and card here
 	list : {
		axis: "x",
		containment: "parent",
		cursor: "crosshair"
	},
	card: {
		cursor: "crosshair"
	}
});
// console.log('trigger', document.getElementById("trigger") );
document.getElementById('trigger').addEventListener("click", function()		{
	trello.init();
});
