
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:3000/getAll",
        type: "GET",
        success: function(result) {
            if (result) {
                var tampung = ""
                for (var i = result.length-1; i >= 0; i--) {
                  tampung += `     <tr>
                                      <td>${result[i].title}</td>
                                      <td>${result[i].description}</td>
                                      <td>${result[i].status}</td>
                                      <td class="collapsing">
                                          <div class="ui fitted checkbox">
                                              <input id="${result[i]._id}" type="checkbox"><label name="actioncheck"></label>
                                          </div>
                                      </td>
                                  </tr>`
                }
              $("#listtodo").append(tampung)
            }
        }
    })
})

function addTodos() {
      $.ajax({
          url: "http://localhost:3000/add",
          type: "POST",
          data: {
            title: $("#title").val(),
            description: $("#description").val(),
            status: "Uncomplete"
          },
          success: function(result) {
              if (result) {
                  tampung = `     <tr>
                                      <td>${result.title}</td>
                                      <td>${result.description}</td>
                                      <td>${result.status}</td>
                                      <td class="collapsing">
                                          <div class="ui fitted checkbox">
                                              <input id="${result._id}" type="checkbox"><label name="actioncheck"></label>
                                          </div>
                                      </td>
                                  </tr>`
                $("#listtodo").prepend(tampung)
                $("#title").val('')
                $("#description").val('')
              }
          }
      })

}

function checkList(){
  var list = $("#listtodo")
  var listId = $("#listtodo tr td.collapsing div input")
  for (var i = 0; i < list.length; i++) {
      var id = $(listId[i]).attr("id")
      if ($(`#${id}`).is(':checked')) {
          return true
      }
  }
  return false
}

function warningDelete(input) {
    if(checkList()){
      swal({
              title: "Are you sure?",
              text: "Todos will be remove",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false
          },
          function() {
              swal("Deleted!", "Your todos has been deleted.", "success");
          })
    }else{
      swal("Warning !", "Silahkan Tandai List Todos")
    }
}
