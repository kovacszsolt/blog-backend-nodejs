/**
 * @swagger
 * /category/save/{id}/:
 *    post:
 *      description: Modify Category
 *      summary: Modify Category
 *      tags: [Category]
 *      security:
 *       - TOKEN: []
 *      parameters:
 *       - name: id
 *         description: Id
 *         in: path
 *         required: true
 *         type: string
 *       - name: title
 *         description: Title
 *         in: formData
 *         required: true
 *         type: string
 *      required:
 *        - title
 *        - intro
 *        - content
 *      properties:
 *        id:
 *          type: string
 *        title:
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
 * /category/save/0/:
 *    post:
 *      description: Add new Category
 *      summary: Add new category
 *      tags: [Category]
 *      security:
 *       - TOKEN: []
 *      parameters:
 *       - name: title
 *         description: Title
 *         in: formData
 *         required: true
 *         type: string
 *      required:
 *        - title
 *        - intro
 *        - content
 *      properties:
 *        title:
 *          type: string
 *      responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             value:
 *               type: string
 */

/**
 * @swagger
 * /category/list/:
 *    get:
 *      description: List all categorys
 *      summary: list all categorys
 *      security:
 *       - TOKEN: []
 *      tags: [Category]
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
 * /category/{id}/:
 *    get:
 *      description: Get Category
 *      summary: Get Category
 *      tags: [Category]
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
 *             value:
 *               type: object
 */


/**
 * @swagger
 * /category/{id}/:
 *    delete:
 *      description: Delete Category
 *      summary: Delete Category
 *      tags: [Category]
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
