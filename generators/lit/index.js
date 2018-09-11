const Generator = require("yeoman-generator");
const _ = require("lodash");
const mkdirp = require("mkdirp");
const path = require("path");
const process = require("process");

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your element name"
      },
      {
        type: "input",
        name: "author",
        message: "Author name"
      }
    ]).then(answers => {
      let name = answers.name.split("-")[1];

      this.props = {
        author: answers.author,
        name: answers.name,
        elementName: answers.name,
        elementClassName: _.chain(answers.name)
          .camelCase()
          .upperFirst()
          .value(),
        readmeName: _.upperFirst(name),
        lowerCaseName: name,
        camelCaseName: _.camelCase(answers.name),
        useSass: answers.useSass,
        sassLibraryPkg: false,
        sassLibraryPath: false,
        generatorRhelementVersion: 'test'
      };

      if (answers.useSass) {
        if (answers.sassLibrary && answers.sassLibrary.pkg) {
          this.props.sassLibraryPkg = answers.sassLibrary.pkg;
        }

        if (answers.sassLibrary && answers.sassLibrary.path) {
          this.props.sassLibraryPath = answers.sassLibrary.path;
        }
      }

      mkdirp.sync(this.props.elementName);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath(`${this.props.elementName}/package.json`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("element.js"),
      this.destinationPath(
        `${this.props.elementName}/${this.props.elementName}.js`
      ),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath(`${this.props.elementName}/README.md`),
      this.props
    );

    // this.fs.copyTpl(
    //   this.templatePath("gulpfile.js"),
    //   this.destinationPath(`${this.props.elementName}/gulpfile.js`),
    //   this.props
    // );

    this.fs.copyTpl(
      this.templatePath("demo/index.html"),
      this.destinationPath(`${this.props.elementName}/demo/index.html`),
      this.props
    );

    // this.fs.copyTpl(
    //   this.templatePath("test/element_test.html"),
    //   this.destinationPath(
    //     `${this.props.elementName}/test/${this.props.elementName}_test.html`
    //   ),
    //   this.props
    // );

    // this.fs.copyTpl(
    //   this.templatePath("test/index.html"),
    //   this.destinationPath(`${this.props.elementName}/test/index.html`),
    //   this.props
    // );

    this.fs.copyTpl(
      this.templatePath("element.story.js"),
      this.destinationPath(
        `${this.props.elementName}/${this.props.elementName}.story.js`
      ),
      this.props
    );

    this.fs.copy(
      this.templatePath(".*"),
      this.destinationPath(`${this.props.elementName}`)
    );

    // this.fs.copy(
    //   this.templatePath("LICENSE.txt"),
    //   this.destinationPath(`${this.props.elementName}/LICENSE.txt`)
    // );

    // if (this.props.useSass) {
    //   this.fs.copyTpl(
    //     this.templatePath("src/element.scss"),
    //     this.destinationPath(
    //       `${this.props.elementName}/src/${this.props.elementName}.scss`
    //     ),
    //     this.props
    //   );
    // } else {
    //   this.fs.copy(
    //     this.templatePath("src/element.css"),
    //     this.destinationPath(`${this.props.elementName}/src/${this.props.elementName}.css`)
    //   )
    // }

    // this.fs.copy(
    //   this.templatePath("src/element.html"),
    //   this.destinationPath(`${this.props.elementName}/src/${this.props.elementName}.html`)
    // );
  }

  install() {
    process.chdir(this.props.elementName);

    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {
    this.spawnCommand("npm", ["run", "build"]);
  }
};
