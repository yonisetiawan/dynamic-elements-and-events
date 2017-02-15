
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:3000/getAll",
        type: "GET",
        success: function(result) {
            if (result) {
                var tampung = ""
                for (var i = result.length-1; i >= 0; i--) {
                  tampung += `     <tr id="trID${result[i]._id}">
                                      <td>${result[i].title}</td>
                                      <td>${result[i].description}</td>
                                      <td id="tdStatus${result[i]._id}">${result[i].status}</td>
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
                  tampung = `     <tr id="trID${result._id}">
                                      <td>${result.title}</td>
                                      <td>${result.description}</td>
                                      <td id="tdStatus${result._id}">${result.status}</td>
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
  var listId = $("#listtodo tr td.collapsing div input")
  for (var i = 0; i < listId.length; i++) {
      var id = $(listId[i]).attr("id")
      if ($(`#${id}`).is(':checked')) {
          return true
      }
  }
  return false
}

function warningAction(input) {
    if(checkList() && input == "remove"){
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
              checkAction(input)
              swal("Deleted!", "Your todos has been deleted.", "success");
          })
    }else if(checkList() && input != "remove"){
          checkAction(input)
    }else{
      swal("Warning !", "Silahkan Tandai List Todos")
    }
}

function checkAction(input) {
  var arrId = []
  var listId = $("#listtodo tr td.collapsing div input")
  for (var i = 0; i < listId.length; i++) {
      var id = $(listId[i]).attr("id")
      if ($(`#${id}`).is(':checked')) {
          if (input == "remove") {
            document.getElementById(`trID${id}`).innerHTML = ""
            arrId.push(id)
          }else{
            document.getElementById(`tdStatus${id}`).innerHTML = input
            arrId.push(id)
          }
      }
  }

  if(input == "remove"){
    deleteTodos(arrId)
  }else{
    updateStatus(arrId, input)
  }
}

function updateStatus(arrId, input) {
  $.ajax({
      url: "http://localhost:3000/update",
      type: "PUT",
      data: {
          arrId: JSON.stringify(arrId),
          statusTodos: input
      },
      success: function(result) {
          return result
      }
  });
}

function deleteTodos(arrId) {
  $.ajax({
      url: "http://localhost:3000/delete",
      type: "DELETE",
      data: {
          arrId: JSON.stringify(arrId)
      },
      success: function(result) {
          return result
      }
  });

}
