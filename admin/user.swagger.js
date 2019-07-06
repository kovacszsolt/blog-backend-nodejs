/**
 * @swagger
 * /admin/user/init/:
 *    get:
 *      description: "deafult user: smith.zsolt@gmail.com / 123"
 *      summary: Create the first user
 *      security:
 *       - TOKEN: []
 *      tags: [User]
 *      responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 */

/**
 * @swagger
 * /admin/user/login/:
 *    post:
 *      description: Login in the Admin Area
 *      summary: User Login
 *      tags: [User]
 *      security:
 *       - TOKEN: []
 *      parameters:
 *       - name: username
 *         description: User name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password.
 *         in: formData
 *         required: true
 *         type: string
 *      required:
 *        - username
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: string
 *      responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 */

/**
 * @swagger
 * /admin/user/add/:
 *    post:
 *      summary: User Create
 *      tags: [User]
 *      security:
 *       - TOKEN: []
 *      parameters:
 *       - name: username
 *         description: User name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password
 *         in: formData
 *         required: true
 *         type: string
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: string
 *      responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 */

/**
 * @swagger
 * /admin/user/save/{id}/:
 *    put:
 *      summary: Modify user
 *      tags: [User]
 *      security:
 *       - TOKEN: []
 *      parameters:
 *       - name: id
 *         description: Id
 *         in: path
 *         required: true
 *         type: string
 *       - name: username
 *         description: Username
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password
 *         in: formData
 *         required: true
 *         type: string
 *      required:
 *        - username
 *        - password
 *      properties:
 *        id:
 *          type: string
 *        username:
 *          type: string
 *        password:
 *          type: string
 *      responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 */

/**
 * @swagger
 * /admin/user/list/:
 *    get:
 *      summary: list all user
 *      security:
 *       - TOKEN: []
 *      tags: [User]
 *      responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 */

/**
 * @swagger
 * /admin/user/{id}/:
 *    delete:
 *      summary: Delete User
 *      tags: [User]
 *      security:
 *       - TOKEN: []
 *      parameters:
 *       - name: id
 *         description: Id
 *         in: path
 *         required: true
 *         type: string
 *      properties:
 *        id:
 *          type: string
 *      responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 */
