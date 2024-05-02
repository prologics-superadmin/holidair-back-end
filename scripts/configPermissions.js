require('dotenv').config();
const db = require('../src/configs/db');
const PermissionCategory = require('../src/models/UserManagement/Permissions/PermissionCategory');
const PermissionGroup = require('../src/models/UserManagement/Permissions/PermissionGroup');
const Permission = require('../src/models/UserManagement/Permissions/Permission');
const PermissionCheckBoxes = require('../src/models/UserManagement/Permissions/PermissionCheckBoxes');
const fs = require('fs');

const permissions = require('./data/permission.data.json');

/**
 * Automates the permissions in the database. 
 * STRUCTURE - CATEGORY: { GROUP: [PERMISSIONS]}
 * EACH PERMISSION HAS FOUR OBJECTS - [CREATE, READ, UPDATE, DELETE]
 * 
 * @returns {Promise<void>}
 * @author RoshanGamage01
 */
async function automatePermissions() {
    console.log("\x1b[34m", "[permission script] Automating Permissions. It may take a while.");
    try {
        console.log("\x1b[32m", "[permission script] Clearing the database.");
        await PermissionCategory.deleteMany({});
        await PermissionGroup.deleteMany({});
        await Permission.deleteMany({});
        await PermissionCheckBoxes.deleteMany({});


        let permissionCategories = Object.keys(permissions);
        console.log("\x1b[32m", "[permission script] Permission Categories:", permissionCategories);
        let permissionsJson = {};

        

        for (let i = 0; i < permissionCategories.length; i++) {
            let category = permissionCategories[i];
            console.log("\x1b[33m", "[permission script] Processing Category:", category);

            let permissionGroups = Object.keys(permissions[category]);
            console.log("\x1b[32m", "[permission script] Permission Groups:", permissionGroups);

            let categoryObj = await PermissionCategory.findOne({ category: category });

            if (!categoryObj) {
                console.log("\x1b[35m", "[permission script] Creating Category:", category);
                categoryObj = await PermissionCategory.create({ category: category });
            }

            for (let j = 0; j < permissionGroups.length; j++) {
                let group = permissionGroups[j];
                console.log("\x1b[33m", "[permission script] Processing Group:", group);

                let permissionsArray = permissions[category][group];

                let groupObj = await PermissionGroup.findOne({ group: group });

                if (!groupObj) {
                    console.log("\x1b[35m", "[permission script] Creating Group:", group);
                    groupObj = await PermissionGroup.create({ group: group, permission_category_id: categoryObj._id });
                }

                for (let k = 0; k < permissionsArray.length; k++) {
                    let permission = permissionsArray[k];
                    console.log("\x1b[33m", "[permission script] Processing Permission:", permission);
                    permissionsJson[permission] = {};

                    let permissionObj = await Permission.findOne({ permission: permission });

                    if (!permissionObj) {
                        console.log("\x1b[35m", "[permission script] Creating Permission:", permission);
                        permissionObj = await Permission.create({ permission: permission, permission_group_id: groupObj._id });
                    }

                    let permissionCheckBoxes = await PermissionCheckBoxes.find({ permissionId: permissionObj._id });
                    
                    if (permissionCheckBoxes.length == 0) {
                        console.log("\x1b[35m", "[permission script] Creating Permission Checkboxes for:", permission);
                        
                        const checkBox_create = await PermissionCheckBoxes.create({ permissionId: permissionObj._id, permission_name: "Create " + permission, check_box_status: false, checkBoxType: 1 });
                        const checkBox_read = await PermissionCheckBoxes.create({ permissionId: permissionObj._id, permission_name: "Read " + permission, check_box_status: false, checkBoxType: 2 });
                        const checkBox_update = await PermissionCheckBoxes.create({ permissionId: permissionObj._id, permission_name: "Update " + permission, check_box_status: false, checkBoxType: 3 });
                        const checkBox_delete = await PermissionCheckBoxes.create({ permissionId: permissionObj._id, permission_name: "Delete " + permission, check_box_status: false, checkBoxType: 4 });

                        permissionsJson[permission]["create"] = checkBox_create._id;
                        permissionsJson[permission]["read"] = checkBox_read._id;
                        permissionsJson[permission]["update"] = checkBox_update._id;
                        permissionsJson[permission]["delete"] = checkBox_delete._id;
                    }
                }
            }
        }

        fs.writeFileSync('src/configs/userPermissions.json', JSON.stringify(permissionsJson, null, 2));

        console.log("\x1b[32m", "[permission script] Permissions Automated Successfully.");
        process.exit(0);
    } catch (_) {
        console.log("\x1b[31m", "[permission script] Error while automating permissions.");
        console.log(_)
        process.exit(1);
    }
}


automatePermissions();