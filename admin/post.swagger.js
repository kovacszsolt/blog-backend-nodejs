/**
 * @swagger
 * /post/save/{id}/:
 *    post:
 *      description: Modify Post
 *      summary: Modify Post
 *      tags: [Post]
 *      security:
 *       - TOKEN: []
 *      parameters:
 *       - name: id
 *         description: Id
 *         in: path
 *         required: true
 *         type: string
 *       - name: image
 *         in: formData
 *         type: file
 *         description: The file to upload.
 *       - name: title
 *         description: Title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: intro
 *         description: Intro text
 *         in: formData
 *         required: true
 *         type: string
 *       - name: content
 *         description: Content text
 *         in: formData
 *         required: true
 *         type: string
 *       - name: imagedelete
 *         description: Image Delete
 *         in: formData
 *         required: false
 *         type: boolean
 *      required:
 *        - title
 *        - intro
 *        - content
 *      properties:
 *        id:
 *          type: string
 *        title:
 *          type: string
 *        intro:
 *          type: string
 *        content:
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
 * /admin/post/save/0/:
 *    post:
 *      description: Add new Post
 *      summary: Add new post
 *      tags: [Post]
 *      security:
 *       - TOKEN: []
 *      parameters:
 *       - name: image
 *         in: formData
 *         type: file
 *         description: The file to upload.
 *       - name: title
 *         description: Title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: intro
 *         description: Intro text
 *         in: formData
 *         required: true
 *         type: string
 *       - name: content
 *         description: Content text
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
 *        intro:
 *          type: string
 *        content:
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
 * /admin/post/list/:
 *    get:
 *      description: List all posts
 *      summary: list all posts
 *      security:
 *       - TOKEN: []
 *      tags: [Post]
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
 * /admin/post/{id}/:
 *    get:
 *      description: Get Post
 *      summary: Get Post
 *      tags: [Post]
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
 * /admin/post/{id}/:
 *    delete:
 *      description: Delete Post
 *      summary: Delete Post
 *      tags: [Post]
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
