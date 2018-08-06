!function ($) {

    'use strict';
 
    var originalRowAttr,
        dataTTId = 'data-tt-id',
        dataTTParentId = 'data-tt-parent-id',
        obj = {},
        parentId = undefined;

    var compareObjects = function (objectA, objectB, compareLength) {
        // Create arrays of property names
        var objectAProperties = Object.getOwnPropertyNames(objectA),
            objectBProperties = Object.getOwnPropertyNames(objectB),
            propName = '';

        if (compareLength) {
            // If number of properties is different, objects are not equivalent
            if (objectAProperties.length !== objectBProperties.length) {
                return false;
            }
        }

        for (var i = 0; i < objectAProperties.length; i++) {
            propName = objectAProperties[i];

            // If the property is not in the object B properties, continue with the next property
            if ($.inArray(propName, objectBProperties) > -1) {
                // If values of same property are not equal, objects are not equivalent
                if (objectA[propName] !== objectB[propName]) {
                    return false;
                }
            }
        }

        // If we made it this far, objects are considered equivalent
        return true;
    };

    var getFieldIndex = function (columns, field) {
        var index = -1;

        $.each(columns, function (i, column) {
            if (column.field === field) {
                index = i;
                return false;
            }
            return true;
        });
        return index;
    };

    var getParentRowId = function (that, id) {
        var parentRows = that.$body.find('tr').not('[' + 'data-tt-parent-id]');

        for (var i = 0; i < parentRows.length; i++) {
            if (i === id) {
                return $(parentRows[i]).attr('data-tt-id');
            }
        }

        return undefined;
    };

    var sumData = function (that, data) {
        var sumRow = {};
        $.each(data, function (i, row) {
            if (!row.IsParent) {
                for(var prop in row) {
                        if (!isNaN(parseFloat(row[prop]))) {
                            if (that.columns[getFieldIndex(that.columns, prop)].groupBySumGroup) {
                                if (sumRow[prop] === undefined) {
                                    sumRow[prop] = 0;
                                }
                                sumRow[prop] += +row[prop];
                            }
                        }
                }
            }
        });
        return sumRow;
    };

    var rowAttr = function (row, index) {
        //Call the User Defined Function
        originalRowAttr.apply([row, index]);

        obj[dataTTId.toString()] = index;

        if (!row.IsParent) {
            obj[dataTTParentId.toString()] = parentId === undefined ? index : parentId;
        } else {
            parentId = index;
            delete obj[dataTTParentId.toString()];
        }

        return obj;
    };

    var setObjectKeys = function () {
        // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
       Object.keys = function (o) {
           if (o !== Object(o)) {
               throw new TypeError('Object.keys called on a non-object');
           }
           var k = [],
               p;
           for (p in o) {
               if (Object.prototype.hasOwnProperty.call(o, p)) {
                   k.push(p);
               }
           }
           return k;
       }
    };

    var getDataArrayFromItem = function (that, item) {
        var itemDataArray = [];
        for (var i = 0; i < that.options.groupByField.length; i++) {
            itemDataArray.push(item[that.options.groupByField[i]]);
        }

        return itemDataArray;
    };

    var getNewRow = function (that, result, index) {
        var newRow = {};
        for (var i = 0; i < that.options.groupByField.length; i++) {
            newRow[that.options.groupByField[i].toString()] = result[index][0][that.options.groupByField[i]];
        }

        newRow.IsParent = true;

        return newRow;
    };

    var groupBy = function (array , f) {
       var groups = {};
       $.each(array, function(i, o) {
           var group = JSON.stringify(f(o));
           groups[group] = groups[group] || [];
           groups[group].push(o);
       });
       return Object.keys(groups).map(function (group) {
            return groups[group];
       });
    };

    var makeGrouped = function (that, data) {
        var newData = [],
            sumRow = {};

        var result = groupBy(data, function (item) {
            //return [item[that.options.groupByField]];
            return getDataArrayFromItem(that, item);
        });

        for (var i = 0; i < result.length; i++) {
            result[i].unshift(getNewRow(that, result, i));
            if (that.options.groupBySumGroup) {
                sumRow = sumData(that, result[i]);
                if (!$.isEmptyObject(sumRow)) {
                    result[i].push(sumRow);
                }
            }
        }

        newData = newData.concat.apply(newData, result);

        if (!that.options.loaded && newData.length > 0) {
            that.options.loaded = true;
            that.options.originalData = that.options.data;
            that.options.data = newData;
        }

        return newData;
    };

    $.extend($.fn.bootstrapTable.defaults, {
        groupBy: false,
        groupByField: [],
        groupBySumGroup: false,
        groupByInitExpanded: undefined, //node, 'all'
        //internal variables
        loaded: false,
        originalData: undefined
    });

    $.fn.bootstrapTable.methods.push('collapseAll', 'expandAll', 'refreshGroupByField','setGroupByOnOff');

    $.extend($.fn.bootstrapTable.COLUMN_DEFAULTS, {
        groupBySumGroup: false
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init,
        _initData = BootstrapTable.prototype.initData;

    BootstrapTable.prototype.init = function () {
        //Temporal validation
        if (!this.options.sortName) {
            if ((this.options.groupBy) && (this.options.groupByField.length > 0)) {
                var that = this;

                // Compatibility: IE < 9 and old browsers
                if (!Object.keys) {
                    setObjectKeys();
                }

                //Make sure that the internal variables are set correctly
                this.options.loaded = false;
                this.options.originalData = undefined;

                originalRowAttr = this.options.rowAttributes;
                this.options.rowAttributes = rowAttr;
                this.$el.on('post-body.bs.table', function () {
                    that.$el.treetable({
                        expandable: true,
                        onNodeExpand: function () {
                            if (that.options.height) {
                                that.resetHeader();
                            }
                        },
                        onNodeCollapse: function () {
                            if (that.options.height) {
                                that.resetHeader();
                            }
                        }
                    }, true);

                    if (that.options.groupByInitExpanded !== undefined) {
                        if (typeof that.options.groupByInitExpanded === 'number') {
                            that.expandNode(that.options.groupByInitExpanded);
                        } else if (that.options.groupByInitExpanded.toLowerCase() === 'all') {
                            that.expandAll();
                        }
                    }
                });
            }
        }
        _init.apply(this, Array.prototype.slice.apply(arguments));
    };

    BootstrapTable.prototype.initData = function (data, type) {
        //Temporal validation
        if (!this.options.sortName) {
            if ((this.options.groupBy) && (this.options.groupByField.length > 0)) {

                this.options.groupByField = typeof this.options.groupByField === 'string' ?
                    this.options.groupByField.replace('[', '').replace(']', '')
                        .replace(/ /g, '').split(',') : this.options.groupByField;

                data = makeGrouped(this, data ? data : this.options.data);
            }
        }
        _initData.apply(this, [data, type]);
    };

    BootstrapTable.prototype.expandAll = function () {
        this.$el.treetable('expandAll');
    };

    BootstrapTable.prototype.collapseAll = function () {
        this.$el.treetable('collapseAll');
    };

    BootstrapTable.prototype.expandNode = function (id) {
        id = getParentRowId(this, id);
        if (id !== undefined) {
            this.$el.treetable('expandNode', id);
        }
    };

    BootstrapTable.prototype.refreshGroupByField = function (groupByFields) {
        if (!compareObjects(this.options.groupByField, groupByFields)) {
            this.options.groupByField = groupByFields;
            this.load(this.options.originalData);
        }
    };
    BootstrapTable.prototype.setGroupByOnOff = function (status) {
        this.options.groupBy=status;
        this.load(this.options.originalData);
    };
}(jQuery);

function bindTableData(tblid,fieldTobind,defaultData)
{     
    if(fieldTobind==''&&defaultData!=='')  //bind the default data
    {
        $(tblid).bootstrapTable({data: eval(defaultData)});
    }
    else
    {
        var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
        if(apiJsonDetails.length>0)
        {
        apiJsonDetails = JSON.parse(this.response);
        var jsonFileds=fieldTobind.split(".");
        var tempData={};
         for (var i = 0; i < jsonFileds.length; i++) {
           if(i==0)
            {
            tempData= apiJsonDetails[jsonFileds[i]];
            }
            else
            {
            tempData=tempData[jsonFileds[i]];;
            }
         }
        $(tblid).bootstrapTable({data: tempData});
        }
        else if(url!='' && url)
        {
            var xhttp = new XMLHttpRequest();
        
        //var url='http://27.109.19.109/api/data';
        xhttp.open("GET", url, true);
        xhttp.send();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                apiJsonDetails = JSON.parse(this.response);
               var jsonFileds=fieldTobind.split(".");
               var tempData={};
                for (var i = 0; i < jsonFileds.length; i++) {
                if(i==0)
                    {
                    tempData= apiJsonDetails[jsonFileds[i]];
                    }
                    else
                    {
                    tempData=tempData[jsonFileds[i]];;
                    }
                }
                $(tblid).bootstrapTable({data: tempData});

            } else {
                //do nothing for now
            }
        }
        }
        else if(window.globaldata) {
            if(typeof(window.globaldata)=='string')
            {
                apiJsonDetails =JSON.parse(atob(window.globaldata));
            }
            else
            {
            apiJsonDetails = JSON.parse(JSON.stringify(window.globaldata));
            }
            var jsonFileds=fieldTobind.split(".");
            var tempData={};
             for (var i = 0; i < jsonFileds.length; i++) {
             if(i==0)
                 {
                 tempData= apiJsonDetails[jsonFileds[i]];
                 }
                 else
                 {
                 tempData=tempData[jsonFileds[i]];;
                 }
             }
             $(tblid).bootstrapTable({data: tempData});
        }
    }

}
function onOffTableGrouping(tblid,status)
{
    if(status=='showgroup')
    {
     $(tblid).bootstrapTable('setGroupByOnOff',true);
    }
    else if (status=='showall')
    {
     $(tblid).bootstrapTable('setGroupByOnOff',false);
    }
}
var tablebinddataArray=[];
var tableidAray=[];
var apiJsonDetails=[];
var tableJsonData=[];
function bindAllTableData()
{    
    if(tableidAray.length>0&&tableidAray.length==tablebinddataArray.length)
    {
        for(var counter=0;counter<tableidAray.length;counter++)
        {
           bindTableData(tableidAray[counter],tablebinddataArray[counter],tableJsonData[counter])
        }
    }
}