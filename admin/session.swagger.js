/**
 * @swagger
 * /session/add/:
 *    get:
 *      description: Create new session for the backend methods
 *      summary: get new session Id
 *      tags: [Session]
 *      responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 */

/**
 * @swagger
 * /session/list/:
 *    get:
 *      description: List all sessions
 *      summary: list all sessions
 *      security:
 *       - TOKEN: []
 *      tags: [Session]
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
 * /session/{id}/:
 *    delete:
 *      summary: Delete Session
 *      tags: [Session]
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
