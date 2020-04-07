
// 使い方
// document.ready実施時に、取得したい件数を指定して呼び出せばOKなようにしておく。

new function(){
	// private変数（外からの書き換えはできない）
	var res_data ;
	var wp_post_data = new Array() ;
	var base_tag ;
	// private関数
	// WPからのデータ取得処理
	var get_wp_post_data = function(){
		$.ajax({	
			url:"http://oune.jp/wp/wp-json/wp/v2/posts?_embed&per_page=" + wpPostBuilder.data_count, // 通信先のURL
			type:"GET",
			dataType:"json",
			timespan:1000
		}).done(function(data1,textStatus,jqXHR) {
			console.log(JSON.stringify(data1));
			res_data = data1;
			wpPostBuilder.for_test = data1;
			console.log(data1);
			extract_res_data();
			get_base_html_parts();
			build_content();
		}).fail(function(jqXHR, textStatus, errorThrown ) {
			console.log("error!!! cannot get wp post data ");
		}).always(function(){
		});	
	};

	// jsonからデータ集める処理（privateで良い）
	var extract_res_data = function(){
		$.each(res_data, function(index, raw_data){
			wp_post_data.push({
				wp_post_title: raw_data["title"]["rendered"],
				wp_post_content: raw_data["content"]["rendered"],
				wp_post_image: raw_data["_embedded"]["wp:featuredmedia"][0]["source_url"],
				wp_post_link: raw_data["link"]
			})
		})
		console.log(wp_post_data);
	};

	// ベースとなるコンテンツを特定のclassから集める処理（privateで良い）
	var get_base_html_parts = function(){
		base_tag = $("." + wpPostBuilder.wp_post_base).first().clone(false,true);
		$("." + wpPostBuilder.wp_post_base).remove();
		console.log(base_tag);
	};

	// ベースのコンテンツにデータをセットしタグを準備（privateで良い）
	var build_content = function(){
		$.each(wp_post_data, function(index, data){
			var append_tag = base_tag.clone();
			append_tag.find("." + wpPostBuilder.wp_post_image).attr('src',data["wp_post_image"]);
			append_tag.find("." + wpPostBuilder.wp_post_link).attr('href',data["wp_post_link"]);
			append_tag.find("." + wpPostBuilder.wp_post_title).html(data["wp_post_title"]);
			append_tag.find("." + wpPostBuilder.wp_post_content).html(data["wp_post_content"]);
			append_tag.appendTo("#" + wpPostBuilder.wp_post_container);
		})
	};
	
	wpPostBuilder = {
		// 投稿のタグ要素を入れる場所のid
		wp_post_container : "wp_post_container",
		// ベースとなるタグのクラス名
		wp_post_base : "wp_post_base",
		// サムネイル画像のimgタグを示すクラス名
		wp_post_image : "wp_post_image",
		// ブログページへのリンクタグのクラス名 
		wp_post_link : "wp_post_link",
		// タイトルが入るタグのクラス名
		wp_post_title : "wp_post_title",
		// コンテンツが入るタグのクラス名
		wp_post_content : "wp_post_content",
		// 取得するデータ件数
		data_count : 5,
		exec_wp_post_get : function(){
			get_wp_post_data();
		},
		for_test: "",
	}
}

// index.htmlなど、埋め込みたいに書く
// wpPostBuilder.data_count = 6;
// wpPostBuilder.exec_wp_post_get();

// memo memo memo memo
// .attr('src','sample3.gif');
// base_tag = $(".wp_post_base").first().clone(true,false);
// $(".wp_post_base").remove();
// base_tag.find(".wp_post_image").attr('src','images/background_5.jpg');
// base_tag.appendTo("#wp_post_container");

// base_tag.find(".wp_post_title")