var ruleModal = $("#ruleModal");
var EditruleModal = $("#EditruleModal");
    $(function () {

        //JSON data by API call
        $.get(RuleListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, rule) {
                    table += '<tr data-code="'+ rule.ErrCode +'" data-desc="'+ rule.ErrDesc +'" data-priority="'+ rule.ErrPriority +'">' +
                        '<td>'+ rule.ErrPriority +'</td>'+
                        '<td>'+ rule.ErrCode +'</td>'+
                        '<td>'+ rule.ErrDesc +'</td>'+
                        '<td><span class="btn btn-xs btn-danger delete-rule">Delete</span>'+' '+
                        '<span class="btn btn-xs btn-success Edit-rule" data-toggle="modal" data-target="#EditruleModal">Edit</span></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });

    // Save rule
    $("#saveRule").on("click", function () {
        // If we found id value in form then update rule detail
        var data = $("#ruleForm").serializeArray();
        var requestPayload = {
            ErrDesc: null,
            ErrCode: null,
            ErrPriority: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'Desc':
                    requestPayload.Desc = element.value;
                    break;
                case 'RuleCode':
                    requestPayload.RuleCode = element.value;
                    break;
                case 'Priority':
                    requestPayload.Priority = element.value;
                    break;
            }
        }
        callApi("POST", ruleSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });

    $(document).on("click", ".delete-rule", function (){
        var tr = $(this).closest('tr');
        var data = {
            rule_id : tr.data('code')
        };
        var isDelete = confirm("Are you sure to delete rule code "+ tr.data('code') +" ?");
        if (isDelete) {
            callApi("POST", DeleteRuleApiUrl, data);
        }
    });

    $(document).on("click", ".Edit-rule", function (){
        var tr = $(this).closest('tr');
        var Id = tr.data('code');
        var ErrDesc = tr.data('desc');
        var ErrPriority = tr.data('priority');
        document.getElementById('EditDescID').value=ErrDesc;
        document.getElementById('EditPriorityID').value=ErrPriority;
        document.getElementById('EditRuleCode').value=Id;
        
        

        $("#editRule").on("click", function () {
            // If we found id value in form then update rule detail
            var data = $("#EditruleForm").serializeArray();
            var requestPayload = {
                Desc: null,
                ErrCode: null,
                Priority: null
            };
            requestPayload.ErrCode=Id;
            for (var i=0;i<data.length;++i) {
                var element = data[i];
                switch(element.name) {
                    case 'Desc':
                        requestPayload.Desc = element.value;
                        break;
                    case 'Priority':
                        requestPayload.Priority = element.value;
                        break;
                }
            }
            callApi("POST", EditRuleApiUrl, {
                'data': JSON.stringify(requestPayload)
            });
        });
    });


    ruleModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#Desc, #RuleCode, #Priority").val('');
        ruleModal.find('.modal-title').text('Add New rule');
    });


    EditruleModal.on('show.bs.modal', function(){
     
        EditruleModal.find('.modal-title').text('Update Rule Detail');
    });



    // ruleModal.on('show.bs.modal', function(){
    //     //JSON data by API call
    //     $.get(uomListApiUrl, function (response) {
    //         if(response) {
    //             var options = '<option value="">--Select--</option>';
    //             $.each(response, function(index, uom) {
    //                 options += '<option value="'+ uom.uom_id +'">'+ uom.uom_name +'</option>';
    //             });
    //             $("#uoms").empty().html(options);
    //         }
    //     });
    // });