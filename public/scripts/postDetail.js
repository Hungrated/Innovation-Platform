/**
 * Created by wuli等等 on 2017/10/19.
 */
$("#post").addClass("active");
var blog_id = $.query.get('index');
//console.log(blog_id);

getComment();

    $("#subComment").on("click",function () {
        debugger;
        var con = $("#comment").val();
        $.ajax({
            type: "POST",
            url: '/api/comment/submit',
            data: {
                blog_id: blog_id,
                student_id:localStorage.school_id,
                content:con
            },
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.status == 3200){
                    $("#comment").val("");
                    getComment();
                    var lastComment = $(".commentlist li:last-child");
                    $("html, body").animate({
                        scrollTop: lastComment.offset().top }, {duration: 500,easing: "swing"});
                } else {
                    console.log(data.msg);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

function getComment() {
    $.ajax({
        type: "GET",
        url: '/api/blog/details',
        data: {
            index: blog_id
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            var blogData = data.blog;
            $("title").text(blogData.title);
            $("#blog_title").text(blogData.title);
            $("#author_name").text(blogData.profile.name);
            $("#created_time").text(blogData.publishTime);
            viewLoad(blogData.content);
            var commentArray =  data.comments;
            $("#comment_num").text(commentArray.length);
            $("#commentCount").text(commentArray.length);
            var commentData = {
                commentsList:commentArray
            };
            var comment = template('comment_List', commentData);
            $("#comment_list_container").html(comment);
            //                alert(date.content);              //55555555555555555555555
        },
        error: function (err) {
            viewLoad("内容为空！");
        }
    });
}

function viewLoad(postContent) {
    $("#markdownView").html(postContent);
    var testEditormdView = editormd.markdownToHTML("test-editormd-view", {
        //markdown: markdown,//+ "\r\n" + $("#append-test").text(),
        //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode: "style,script,iframe",  // you can filter tags decode
        //toc             : false,
        tocm: true,    // Using [TOCM]
        tocContainer: "#custom-toc-container", // 自定义 ToC 容器层
        //gfm             : false,
        //tocDropdown     : true,
        // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
        emoji: true,
        taskList: true,
        tex: true,  // 默认不解析
        flowChart: true,  // 默认不解析
        sequenceDiagram: true  // 默认不解析
    });

    //console.log("返回一个 jQuery 实例 =>", testEditormdView);

    // 获取Markdown源码
    //console.log(testEditormdView.getMarkdown());

    //alert(testEditormdView.getMarkdown());
}