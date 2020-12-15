// Generated by CoffeeScript 1.12.7
(function() {
  var BaseClass, DataTypes, ErrorWithInfo, FieldTypes, Promise, Validator, array, arrayDataType, booleanDataType, clone, dateDataType, emailRegexp, formattedInspect, functionDataType, isDate, isPlainArray, isPlainObject, isString, log, merge, mergeIntoUnless, numberDataType, object, objectDataType, present, pushIfNotPresent, ref, ref1, select, shallowClone, stringDataType, toDate, toMilliseconds, toSeconds, w,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('art-standard-lib'), merge = ref.merge, log = ref.log, BaseClass = ref.BaseClass, shallowClone = ref.shallowClone, isString = ref.isString, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray, Promise = ref.Promise, formattedInspect = ref.formattedInspect, present = ref.present, select = ref.select, emailRegexp = ref.emailRegexp, mergeIntoUnless = ref.mergeIntoUnless, w = ref.w, clone = ref.clone, ErrorWithInfo = ref.ErrorWithInfo, array = ref.array, object = ref.object, isDate = ref.isDate, pushIfNotPresent = ref.pushIfNotPresent, toDate = ref.toDate, toMilliseconds = ref.toMilliseconds, toSeconds = ref.toSeconds;

  ref1 = require('./DataTypes'), booleanDataType = ref1.booleanDataType, numberDataType = ref1.numberDataType, stringDataType = ref1.stringDataType, objectDataType = ref1.objectDataType, arrayDataType = ref1.arrayDataType, functionDataType = ref1.functionDataType, dateDataType = ref1.dateDataType;

  FieldTypes = require('./FieldTypes');

  BaseClass = require('art-class-system').BaseClass;

  DataTypes = require('./DataTypes');


  /*
  CONCEPTS:
  
    Each field can have up to three custom functions:
  
      validate: (v) -> true/false
  
        Validate is evaludated first. If it returns a false value, validation fails.
  
        NOTE: Return false for validation failures, DO NOT THROUGH ERRORS
  
      preprocess: (v1) -> v2
  
        Preprocess can arbitrarily transform the input value to any output value.
  
        The output-value is what is passed back after successful validation.
  
        NOTE: preprocessors should NOT throw validation-related errors
  
      postValidate: (v) -> true/false
  
        Post-validate is evaludated last. It works the same as validate, but
        sometimes it's easy to normalize the input first with 'preprocess' and
        THEN validate it.
  
  USAGE:
    new Validator validatorFieldsProps, options
  
      IN:
        validatorFieldsProps:
          plain object with zero or more field-validations defined:
            fieldName: fieldProps
        options:
          exclusive: true/false
            if true, only fields listed in validatorFieldsProps are allowed.
  
          context: String
            String to attached to errors for clarity.
  
      fieldProps:
        string or plainObject
        string: selects fieldProps from one of the standard @FieldTypes (see below)
        plainObject: (all fields are optional)
  
          validate: (v) -> true/false
            whenever this field is included in an update OR create operation,
              validate() must return true
            NOTE: validate is evaluated BEFORE preprocess
  
          preprocess: (v1, forCreate) -> v2
            whenever this field is included in an update OR create operation,
              after validation succeeds,
              value = preprocess value
            NOTE: validate is evaluated BEFORE preprocess
  
          required: true/false/string
            if true/string
              when creating records, this field must be included
            if string
              fieldProps = merge fieldProps, FieldTypes[string]
  
          present: true/false
            if true
              when creating records, this field must be include and 'present' (see Art.Foundation.present)
  
          fieldType: string
            fieldProps = merge FieldTypes[string], fieldProps
  
          dataType: string
            sepecify which of the standard Json data-types this field contains
            This is not used by Validator itself, but is available for clients to reflect on field-types.
            Must be one of the values in: DataTypes
  
          instanceof: class
            in addition to passing validate(), if present, the value must also be an instance of the
            specified class
  
  EXAMPLES:
    new
   */

  module.exports = Validator = (function(superClass) {
    var fieldPropsWithGeneratedPostValidator, normalizeDepricatedProps, normalizeFieldProps, normalizeFieldTypeProp, normalizeInstanceOfProp, normalizePlainObjectProps, preprocessFields, validateCreate, validateUpdate;

    extend(Validator, superClass);

    normalizeInstanceOfProp = function(ft) {
      var _instanceof, validate;
      if (_instanceof = ft["instanceof"]) {
        validate = ft.validate;
        return merge(ft, {
          validate: function(v) {
            return (v instanceof _instanceof) && (!validate || validate(v));
          }
        });
      } else {
        return ft;
      }
    };

    normalizePlainObjectProps = function(ft) {
      var k, out, subObject, v;
      out = null;
      for (k in ft) {
        v = ft[k];
        if (k !== "fields") {
          if (isPlainObject(subObject = v)) {
            if (!out) {
              out = shallowClone(ft);
            }
            out[k] = true;
            mergeIntoUnless(out, normalizePlainObjectProps(subObject));
          }
        }
      }
      return out || ft;
    };

    normalizeDepricatedProps = function(ft) {
      if (ft.requiredPresent) {
        throw new Error("DEPRICATED: requiredPresent. Use: present: true");
      }
      if (isString(ft.required)) {
        throw new Error("DEPRICATED: required can no longer specifiy the field-type. Use: required: fieldType: myFieldTypeString OR 'required myFieldTypeString'");
      }
      if (isString(ft.present)) {
        throw new Error("DEPRICATED: present can no longer specifiy the field-type. Use: present: fieldType: myFieldTypeString OR 'present myFieldTypeString'");
      }
      return ft;
    };

    normalizeFieldTypeProp = function(ft) {
      var fieldType, fields;
      fieldType = ft.fieldType, fields = ft.fields;
      if (fields) {
        fieldType || (fieldType = "object");
      }
      if (isString(fieldType)) {
        return merge(FieldTypes[fieldType], ft);
      } else {
        return ft;
      }
    };

    Validator.normalizeFields = function(fields) {
      return object(fields, normalizeFieldProps);
    };

    Validator.normalizeFieldProps = normalizeFieldProps = function(ft) {
      var fieldProps, ftArray, processed, string, strings, subFt;
      fieldProps = (function() {
        var i, len, ref2;
        if (isPlainObject(ft)) {
          return normalizeFieldTypeProp(normalizeInstanceOfProp(normalizeDepricatedProps(normalizePlainObjectProps(ft))));
        } else if (isPlainArray(ftArray = ft)) {
          processed = (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = ftArray.length; i < len; i++) {
              ft = ftArray[i];
              results.push(normalizeFieldProps(ft));
            }
            return results;
          })();
          return merge.apply(null, processed);
        } else if (isString(strings = ft)) {
          ft = {};
          ref2 = w(strings);
          for (i = 0, len = ref2.length; i < len; i++) {
            string = ref2[i];
            if (subFt = FieldTypes[string]) {
              ft.fieldType = string;
              mergeIntoUnless(ft, subFt);
            } else {
              ft[string] = true;
            }
          }
          return ft;
        } else if (ft === true) {
          return FieldTypes.any;
        } else {
          throw new Error("fieldType must be a string or plainObject. Was: " + (formattedInspect(ft)));
        }
      })();
      return fieldPropsWithGeneratedPostValidator(merge(FieldTypes[fieldProps.fieldType], fieldProps));
    };

    fieldPropsWithGeneratedPostValidator = function(fieldProps) {
      var fields, maxLength, minLength, postValidate, validator;
      postValidate = fieldProps.postValidate, maxLength = fieldProps.maxLength, minLength = fieldProps.minLength, fields = fieldProps.fields;
      if ((maxLength != null) || (minLength != null) || (fields != null)) {
        if (fields) {
          validator = new Validator(fields, {
            exclusive: true
          });
          fieldProps.preprocess = function(value, forCreate) {
            return validator.preprocessFields(value, forCreate);
          };
        }
        fieldProps.postValidate = function(value, fieldName, fields) {
          if (postValidate) {
            if (!postValidate(value, fieldName, fields)) {
              return false;
            }
          }
          if (value != null) {
            if ((maxLength != null) && value.length > maxLength) {
              return false;
            }
            if ((minLength != null) && value.length < minLength) {
              return false;
            }
            try {
              if (validator != null) {
                validator.validate(value);
              }
              return true;
            } catch (error1) {
              return false;
            }
          } else {
            return true;
          }
        };
      }
      return fieldProps;
    };

    function Validator(fieldDeclarationMap, options) {
      this._fieldProps = {};
      this._requiredFields = [];
      this.addFields(fieldDeclarationMap);
      if (options) {
        this.exclusive = options.exclusive, this.context = options.context;
      }
    }

    Validator.property("exclusive");

    Validator.prototype.addFields = function(fieldDeclarationMap) {
      var field, fieldOptions;
      for (field in fieldDeclarationMap) {
        fieldOptions = fieldDeclarationMap[field];
        fieldOptions = this._addField(field, fieldOptions);
        if (fieldOptions.required || fieldOptions.present) {
          pushIfNotPresent(this._requiredFields, field);
        }
      }
      return null;
    };

    Validator.getter({
      inspectedObjects: function() {
        return {
          Validator: this._fieldProps
        };
      }
    });

    Validator.prototype.preCreate = function(fields, options) {
      log.error("Validator.preCreate is DEPRICATED. Use .validate or .validateCreate");
      return Promise.resolve(fields).then((function(_this) {
        return function(fields) {
          return _this.preCreateSync(fields, options);
        };
      })(this));
    };

    Validator.prototype.preUpdate = function(fields, options) {
      log.error("Validator.preUpdate is DEPRICATED. Use .validateUpdate");
      return Promise.resolve(fields).then((function(_this) {
        return function(fields) {
          return _this.preUpdateSync(fields, options);
        };
      })(this));
    };

    Validator.prototype.validateSync = function() {
      throw new Error("DEPRICATED: use validate");
    };

    Validator.prototype.preCreateSync = function(fields, options) {
      if (fields == null) {
        fields = {};
      }
      log.error("preCreateSync is DEPRICATED. use .validateCreate or just .validate");
      return this.validateCreate(fields, options);
    };

    Validator.prototype.preUpdateSync = function(fields, options) {
      if (fields == null) {
        fields = {};
      }
      log.error("preUpdateSync is DEPRICATED. use validateUpdate");
      return this.validateUpdate(fields, options);
    };


    /*
    IN:
      fields: - the object to check
      options:
        context: string - included in validation errors for reference
        logErrors: false - if true, will log.error errors
    
    OUT: preprocessed fields - if they pass, otherwise error is thrown
    
    NOTE: missing fields are errors
     */

    Validator.prototype.validateCreate = validateCreate = function(fields, options) {
      var error, out, processedFields;
      if (fields == null) {
        fields = {};
      }
      processedFields = null;
      out = (function() {
        try {
          return this.requiredFieldsPresent(fields) && this.presentFieldsValid(fields) && this.postValidateFields(processedFields = this.preprocessFields(fields, true));
        } catch (error1) {
          error = error1;
          return log.error({
            Validator: {
              error_in: {
                validateCreate: {
                  fields: fields,
                  options: options,
                  "this": this,
                  error: error
                }
              }
            }
          });
        }
      }).call(this);
      return out || this._throwError(fields, processedFields, options, true);
    };

    Validator.prototype.validate = validateCreate;


    /*
    IN:
      fields: - the object to check
      options:
        context: string - included in validation errors for reference
        logErrors: false - if true, will log.error errors
    
    OUT: preprocessed fields - if they pass, otherwise error is thrown
    
    NOTE: missing fields are ignored
     */

    Validator.prototype.validateUpdate = validateUpdate = function(fields, options) {
      var error, out, processedFields;
      if (fields == null) {
        fields = {};
      }
      out = (function() {
        try {
          return this.presentFieldsValid(fields) && this.postValidateFields(processedFields = this.preprocessFields(fields));
        } catch (error1) {
          error = error1;
          return log.error({
            Validator: {
              error_in: {
                validateUpdate: {
                  fields: fields,
                  options: options,
                  "this": this,
                  error: error
                }
              }
            }
          });
        }
      }).call(this);
      return out || this._throwError(fields, processedFields, options);
    };

    Validator.prototype._throwError = function(fields, processedFields, options, forCreate) {
      var errors, info, message, messageFields, ref2;
      info = {
        errors: errors = {}
      };
      messageFields = [];
      array(this.invalidFields(fields), messageFields, (function(_this) {
        return function(f) {
          errors[f] = "invalid";
          if (_this.exclusive && !_this._fieldProps[f]) {
            return "unexpected '" + f + "' field";
          } else {
            return "invalid " + f;
          }
        };
      })(this));
      array(this.postInvalidFields(processedFields), messageFields, (function(_this) {
        return function(f) {
          errors[f] = "invalid";
          return "invalid processed " + f;
        };
      })(this));
      forCreate && array(this.missingFields(fields), messageFields, function(f) {
        errors[f] = "missing";
        return "missing " + f;
      });
      message = ((ref2 = options != null ? options.context : void 0) != null ? ref2 : this.context) + " " + (forCreate ? 'create' : 'update') + "-validation failed. Invalid fields: " + (messageFields.join(', '));
      info.fields = fields;
      throw new ErrorWithInfo(message.trim(), info);
    };

    Validator.prototype.presentFieldPostValid = function(fields, fieldName, value) {
      var fieldProps, postValidate;
      if (fieldProps = this._fieldProps[fieldName]) {
        postValidate = fieldProps.postValidate;
        return !postValidate || (value == null) || value === null || value === void 0 || postValidate(value, fieldName, fields);
      } else {
        return true;
      }
    };

    Validator.prototype.presentFieldValid = function(fields, fieldName, value) {
      var fieldProps, validate;
      if (fieldProps = this._fieldProps[fieldName]) {
        validate = fieldProps.validate;
        if (fieldProps.present && !present(value)) {
          return false;
        }
        return !validate || (value == null) || value === null || value === void 0 || validate(value, fieldName, fields);
      } else {
        return !this.exclusive;
      }
    };

    Validator.prototype.requiredFieldPresent = function(fields, fieldName) {
      var fieldProps;
      if (!(fieldProps = this._fieldProps[fieldName])) {
        return true;
      }
      if (fieldProps.required && (fields[fieldName] == null)) {
        return false;
      }
      if (fieldProps.present && !present(fields[fieldName])) {
        return false;
      }
      return true;
    };

    Validator.prototype.presentFieldsValid = function(fields) {
      var fieldName, fieldValue;
      for (fieldName in fields) {
        fieldValue = fields[fieldName];
        if (!this.presentFieldValid(fields, fieldName, fieldValue)) {
          return false;
        }
      }
      return true;
    };

    Validator.prototype.requiredFieldsPresent = function(fields) {
      var fieldName, fieldValue, ref2;
      ref2 = this._fieldProps;
      for (fieldName in ref2) {
        fieldValue = ref2[fieldName];
        if (!this.requiredFieldPresent(fields, fieldName)) {
          return false;
        }
      }
      return true;
    };

    Validator.prototype.postValidateFields = function(fields) {
      var fieldName, fieldValue;
      for (fieldName in fields) {
        fieldValue = fields[fieldName];
        if (!this.presentFieldPostValid(fields, fieldName, fieldValue)) {
          return false;
        }
      }
      return fields;
    };

    Validator.prototype.preprocessFields = preprocessFields = function(fields, applyDefaults) {
      var fieldName, oldValue, preprocess, processedFields, props, value;
      processedFields = null;
      if (applyDefaults) {
        fields || (fields = {});
      }
      fields && (function() {
        var ref2, results;
        ref2 = this._fieldProps;
        results = [];
        for (fieldName in ref2) {
          props = ref2[fieldName];
          preprocess = props.preprocess;
          value = void 0 !== (oldValue = fields[fieldName]) ? oldValue : applyDefaults && props["default"];
          if (preprocess && (value != null)) {
            value = preprocess(value, applyDefaults);
          }
          if (value !== oldValue) {
            processedFields || (processedFields = shallowClone(fields));
            results.push(processedFields[fieldName] = value);
          } else {
            results.push(void 0);
          }
        }
        return results;
      }).call(this);
      return processedFields || fields || {};
    };

    Validator.prototype.preprocess = preprocessFields;

    Validator.prototype.invalidFields = function(fields) {
      var k, results, v;
      results = [];
      for (k in fields) {
        v = fields[k];
        if (!this.presentFieldValid(fields, k, v)) {
          results.push(k);
        }
      }
      return results;
    };

    Validator.prototype.postInvalidFields = function(fields) {
      var k, results, v;
      results = [];
      for (k in fields) {
        v = fields[k];
        if (!this.presentFieldPostValid(fields, k, v)) {
          results.push(k);
        }
      }
      return results;
    };

    Validator.prototype.missingFields = function(fields) {
      var i, k, len, ref2, results;
      ref2 = this._requiredFields;
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        k = ref2[i];
        if (!this.requiredFieldPresent(fields, k)) {
          results.push(k);
        }
      }
      return results;
    };

    Validator.prototype._addField = function(field, options) {
      return this._fieldProps[field] = normalizeFieldProps(options);
    };

    return Validator;

  })(BaseClass);

}).call(this);

//# sourceMappingURL=Validator.js.map
