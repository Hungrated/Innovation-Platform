/**
 * Created by wuli等等 on 2017/10/19.
 */
$("#post").addClass("active");
// var searchType = $("#searchType");
//var searchValue = $("#searchValue");
// console.log($("#postCount").val());
/*$('#pagination').jqPaginator({
    totalCounts:parseInt($("#postCount").val()),
    totalPages: parseInt($("#pageCount").val()),
    pageSize: 5,
    currentPage:parseInt($("#currentPage").val()),
    onPageChange: function (num, type) {
        if(type == "change"){
            location.href = "/articleList/page=" + num;
        }
    }
});
*/
$(function () {
    $.ajax({
        type:'POST',
        url:'http://localhost:3000/api/blog/query',
        data:{
            type:'project'
        },
        dataType:'json',
        success:function (data) {
            debugger;
            console.log(data);
            var postListData = {
                postLists:data
            };
            //console.log(postListData);
            var post = template('postList', postListData);
            $("#postListContainer").html(post);
        }
    });
});
