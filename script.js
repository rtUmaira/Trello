(function($) {

	$.fn.Trello = function() {
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
		}
		var that = this;
		document.getElementById("trigger").addEventListener("click", function(){
			init.call(that);
		});
	};

	// public methods

	function init() {
		// overlay div
		var div_o = document.createElement("div");
		div_o.className = "overlay";
		document.body.appendChild(div_o);

		var div_f = document.createElement("div");
		div_f.className = "form-note";
		div_o.appendChild(div_f);

		var label = document.createElement("label");
		label.innerHTML = "Title";

		var input_t = document.createElement("input");
		input_t.type = "text";
		input_t.id = "title";
		input_t.className = "form-control";

		var button = document.createElement("button");
		button.className = "btn btn-success";
		button.type = "submit";
		button.innerHTML = "Submit";
		var that = this;

		// console.log('that.options', that.options);
		button.onclick = function() {	create_board.call()};

		var image = document.createElement("img");
		image.src = "https://www.pledgesports.org/wp-content/themes/pledge_v2.3/img/close.png";
		image.onclick = function() {  $(".overlay").toggle(); };

		div_f.appendChild(label);
		div_f.appendChild(input_t);
		div_f.appendChild(button);
		div_f.appendChild(image);

		$(".overlay").toggle();

		// board, lists div
		var div_b = document.createElement("div");
		div_b.id = "board";
		div_b.style.display = "none";
		document.body.appendChild(div_b);

		var h2 = document.createElement("h2");

		var input_l = document.createElement("input");
		input_l.type = "text";
		input_l.id = "list";
		input_l.placeholder = "Add a list...";

		var div_d = document.createElement("div");
		div_d.className = "dropdown";

		var button2 = document.createElement("button");
		button2.className = "btn btn-success";
		button2.type = "submit";
		button2.onclick = function() { create_list.call(that) };
		button2.innerHTML = "Save";

		var image2 = document.createElement("img");
		image2.src = "https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-22-128.png";
		image2.onclick = function() { please_close.call() };

		div_d.appendChild(button2);
		div_d.appendChild(image2);

		div_b.appendChild(h2);
		div_b.appendChild(input_l);
		div_b.appendChild(div_d);
		$(".dropdown").toggle();

	};

	function create_board() {
		$(".overlay").toggle();

		var title = document.getElementById('title').value;
		// console.log(title);
		$("#board h2").html(title);
		$("#board").toggle();

		document.getElementById("list").addEventListener("click", function(){
			$(".dropdown").toggle();
		});
	}

	function create_list() {
		var list_name = document.getElementById('list').value;
		$(".dropdown").toggle();
		document.getElementById('list').value = '';

		// create a list on the right
		var div = document.createElement("div");
		div.className = "list";

		if (this.divs >= 1) {
			this.divs = this.divs + 1;
		} else {
			this.divs = 1;
		}
		div.id = "draggable" + this.divs;
		div.innerHTML = list_name;

		document.body.appendChild(div);
		$("#draggable" + this.divs).draggable(this.options.list);

		// create input
		var input = document.createElement("input");
		input.type = "text";
		input.id = "input" + this.divs;
		input.class = "form-control";
		input.placeholder = "Add a card...";
		div.appendChild(input);

		$("#" + input.id).droppable({
			drop: function (event, ui) {
				var child = ui.helper[0];
				var parent = $(this).parent()[0];
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
		div_d.className = "dropdown";
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
		this.options.card.cancel = "";
		$("#" + text_area.id).draggable(this.options.card);
	}

	function please_close() {
		$(".dropdown").toggle();
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


}(jQuery));

$("#begin" ).Trello({
	list : {
		axis: "x",
		containment: "parent",
		cursor: "crosshair"
	},
	card: {
		cursor: "crosshair"
	}
});
