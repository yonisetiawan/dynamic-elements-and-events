const modelsTodos = require('../models/todo');


var Todos = {

    add: function(req, res, next) {
        var addTodos = new modelsTodos({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        })
        addTodos.save(function(err, data) {
            if (err) {
                res.send(err)
            } else {
                res.send(data)
            }
        })
    },

    getAll: function(req, res, next) {
        modelsTodos.find({},function(err, result) {
                res.send(result)
            });
    },
    //
    // update: function(req, res, next) {
    //     var dataUpdate = JSON.parse(req.body.dataUpdate)
    //     dataUpdate.forEach(function(data) {
    //         modelsTodos.findById(data, function(err, result) {
    //             if (err) res.send(err)
    //             else {
    //                 result.status = req.body.status
    //                 result.save()
    //             }
    //         }, {
    //             new: true
    //         }).then(function(err, resultUpdate) {
    //             if (err) res.send(err)
    //             else
    //                 res.send(resultUpdate)
    //         })
    //     })
    // },
    delete: function(req, res, next) {
        var dataRemove = JSON.parse(req.body.arrId)
        dataRemove.forEach(function(data) {
            modelsTodos.find({
                _id: data
            },function(err, result) {
                if (err) res.send(err)
                else{
                  result[0].remove(function(err) {
                      if (err) res.send(err)
                  })
                }
            })
        })
        res.send({
          status: true
        })
    }
}

module.exports = Todos
