/* global $ */
/* global _ */
<script src = "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js" ></script>
$(document).ready(function(){
    $.ajax({
        
            method: "GET",
            url: "https://pixabay.com/api/",
            dataType: "json",
            data: { "key": "13797841-a8d5bfb0e5b0179c59dd07a69",
                "q": "rockets"
            },
            success: function(result,status) {
                result.hits = _.shuffle(result.hits);
                console.log(result.hits[0].largeImageURL)
                $("body").css('background-image', `url(${result.hits[0].largeImageURL}`)
            }
        
        });//ajax
})