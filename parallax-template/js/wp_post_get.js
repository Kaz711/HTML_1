var res_data ;
var data_count = 5;

// 使い方
// document.ready実施時に、取得したい件数を指定して呼び出せばOKなようにしておく。

	$.ajax({	
		url:"http://oune.jp/wp/wp-json/wp/v2/posts?per_page=" + data_count, // 通信先のURL
		type:"GET",
		dataType:"json",
		timespan:1000
		}).done(function(data1,textStatus,jqXHR) {
      console.log(JSON.stringify(data1));
      res_data = data1;
      res_data.each
      alert("success");
		}).fail(function(jqXHR, textStatus, errorThrown ) {
      alert("fail");
		}).always(function(){
      alert("always");
  	});

// jsonからデータ集める処理（privateで良い）
function extract_res_data(data){

}

// ベースとなるコンテンツを特定のidから集める処理（privateで良い）
function get_base_html_parts(data){

}

// ベースのコンテンツにデータをセット（privateで良い）
function build_content(base_html,data){

}

// .attr('src','sample3.gif');
