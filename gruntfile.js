// Dependencies - Framework/Vendor
const {
    auditDependencies,
    checkDependencies,
    getNewVersion,
    identifyLicenses,
    incrementVersionPatch,
    logNotImplementedMessage,
    migrateDependencies,
    lintCode,
    publishPackageToNPM,
    updateDataPosDependencies
} = require('@datapos/datapos-operations/commonHelpers');

// Configuration
module.exports = (grunt) => {
    // Set external task configuration.
    grunt.initConfig({
        shell: {
            build: { command: 'vite build' },
            commitAndPushToGitHub: {
                command: () => ['git add .', `git commit -m "v${getNewVersion()}"`, 'git push origin main:main'].join('&&')
            }
        }
    });

    // Load external tasks.
    grunt.loadNpmTasks('grunt-shell');

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
    grunt.registerTask('incrementVersionPatch', function () {
        incrementVersionPatch(grunt, this, 'package.json');
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
    grunt.registerTask('release', ['incrementVersionPatch', 'shell:commitAndPushToGitHub', 'build', 'publishPackageToNPM']); // alt+ctrl+shift+r.
    grunt.registerTask('synchronise', ['incrementVersionPatch', 'shell:commitAndPushToGitHub']); // alt+ctrl+shift+s.
    grunt.registerTask('test', ['logNotImplementedMessage:Test']); // alt+ctrl+shift+t.
    grunt.registerTask('update', ['updateDataPosDependencies']); // alt+ctrl+shift+u.
};
