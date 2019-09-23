// Functions helper
export default {
  jsonToFormData: jsonObj => {
    var formData = new FormData();
    for (var key in jsonObj) {
      formData.append(key, jsonObj[key]);
    }
    return formData;
  },
  getShortcutName: (_firstName, _lastName, _fullName) => {
    if (_firstName && _lastName) {
      return (
        _firstName.substr(0, 1).toUpperCase() +
        _lastName.substr(0, 1).toUpperCase()
      );
    }
    if (_fullName) {
      return _fullName
        .split(" ")
        .map(item => item.substr(0, 1).toUpperCase())
        .join("");
    }
    return "N/A";
  }
};
