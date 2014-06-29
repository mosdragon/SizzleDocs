var Doc = function () {
  this.data = {
    _user: null,
    title: null,
    content: null,
    tags: null,
    created: null,
    lastModified: null,
    docNumber: null
  };

  this.getData = function(){
    return this.data;
  }

  this.fillData = function (info) {
    for(var prop in this.data) {
      if(this.data[prop] !== 'undefined') {
        this.data[prop] = info[prop];
      }
    }
    this.data.created = (new Date()).toDateString();
    this.data.lastModified = (new Date()).toDateString();
  };

  this.modified = function () {
    this.data.lastModified = (new Date()).toDateString();
  };

  this.updateDoc = function (input) {
    if(input.title){
      this.data.title = input.title;
    }
    if(input.content){
      this.data.content = input.content;
    }
    if(input) {
      this.modify();
    }
  };

  this.changeUser = function(input){
    if(input.user ){
      this.data.user = input.user;
    }
  }

  this.getInformation = function () {
    return this.data;
  };
};

module.exports = function (info) {
  var instance = new Doc();
  instance.fillData(info);

  return instance;
};