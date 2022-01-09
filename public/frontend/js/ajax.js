const formatDateHelper = (time, type = null) => {
    return moment(time).format('hh:mm DD-MM-YYYY');
}

const formatSummaryHelper = (content, limit = 150) => {
    return content.replace(/<[^>]*>/igm, "").substring(0, limit);
}


 // const url = $('#rss-feeds').data('link');
    // $.ajax({
    //     method: 'get',
    //     url,
    //     data: {
    //         minRow: 1,
    //         maxRow: 10
    //       },
    //     success: (data) => {
    //         var $xml = $(data);
    //         let xhtml = '';
    //         $xml.find("item").each(function() {
    //             var $this = $(this);
    //             const   item = {
    //                     title: $this.find("title").text(),
    //                     link: $this.find("link").text(),
    //                     description: $this.find("description").text(),
    //                     pubDate: $this.find("pubDate").text(),
    //                     author: $this.find("author").text()
    //             }
    //             let src_img;
    //             let content;
                
    //             item.description.replace(/src\s*=\s*"(.+?)"/gi, (match) => src_img = match) ;
    //             item.description.replace(/<\/br>(.*?)\./gi, (match) => content = match) ;
    //             // content = content.replace(/<\/br>/gi, '');
    //             console.log(content)
                
    //             xhtml+= `<div class="row pb-4">
    //                         <div class="col-md-5">
    //                             <div class="fh5co_hover_news_img">
    //                                 <div style="height:auto;" class="fh5co_news_img"><img style="width: 260px; height:fit-content" ${src_img} alt="${item.title}"/></div>
    //                             </div>
    //                         </div>
    //                         <div class="col-md-7 ">
    //                             <a target="_blank" href="${item.link}" class="d-block fh5co_magna py-2"> ${item.title.toString()} </a> 
    //                             <a href="" class="fh5co_mini_time py-3"> <i class="fa fa-clock-o"></i> ${formatDateHelper(item.pubDate)} </a>
    //                             <div class="fh5co_consectetur"> ${content}...</div>
    //                         </div>
    //                     </div>`;
    //         });
    //         $('#rss-feeds').html(xhtml);
    //     }
    // });