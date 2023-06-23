// Dependencies - Operations
const {
    auditDependencies,
    checkDependencies,
    identifyLicenses,
    logNotImplementedMessage,
    migrateDependencies,
    lintCode,
    publishPackageToNPM,
    updateDataPosDependencies,
    syncRepoWithGithub
} = require('@datapos/datapos-operations/commonHelpers');

// Configuration
module.exports = (grunt) => {
    // Register local tasks.
    grunt.registerTask('auditDependencies', function () {
        auditDependencies(grunt, this);
    });
    grunt.registerTask('checkDependencies', function () {
        checkDependencies(grunt, this);
    });
    grunt.registerTask('identifyLicenses', function () {
        identifyLicenses(grunt, this);
    });
    grunt.registerTask('lintCode', function () {
        lintCode(grunt, this, ['*.cjs', '*.js', '**/*.ts']);
    });
    grunt.registerTask('logNotImplementedMessage', (taskName) => logNotImplementedMessage(taskName));
    grunt.registerTask('migrateDependencies', function () {
        migrateDependencies(grunt, this);
    });
    grunt.registerTask('publishPackageToNPM', function () {
        publishPackageToNPM(grunt, this);
    });
    grunt.registerTask('syncRepoWithGithub', function () {
        syncRepoWithGithub(grunt, this, 'package.json');
    });
    grunt.registerTask('updateDataPosDependencies', function (updateTypeId) {
        updateDataPosDependencies(grunt, this, updateTypeId);
    });

    // Register common repository management tasks. These tasks are all invoked by VSCode keyboard shortcuts identified in the comments.
    grunt.registerTask('audit', ['auditDependencies']); // alt+ctrl+shift+a.
    grunt.registerTask('build', ['shell:build']); // alt+ctrl+shift+b.
    grunt.registerTask('check', ['checkDependencies']); // alt+ctrl+shift+c.≤
    grunt.registerTask('document', ['identifyLicenses']); // alt+ctrl+shift+d.
    grunt.registerTask('format', ['logNotImplementedMessage:Format']); // alt+ctrl+shift+f.
    grunt.registerTask('lint', ['lintCode']); // alt+ctrl+shift+l.
    grunt.registerTask('migrate', ['migrateDependencies']); // alt+ctrl+shift+m.
    grunt.registerTask('publish', ['publishPackageToNPM']); // alt+ctrl+shift+p.
    grunt.registerTask('release', ['syncRepoWithGithub', 'build', 'publishPackageToNPM']); // alt+ctrl+shift+r.
    grunt.registerTask('synchronise', ['syncRepoWithGithub']); // alt+ctrl+shift+s.
    grunt.registerTask('test', ['logNotImplementedMessage:Test']); // alt+ctrl+shift+t.
    grunt.registerTask('update', ['updateDataPosDependencies']); // alt+ctrl+shift+u.
};
