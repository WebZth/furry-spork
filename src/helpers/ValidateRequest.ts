import { AnySchema } from "joi";
import { Request, Response, NextFunction } from "express";

const validate =
	(schema: AnySchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync({
				body: req.body,
				query: req.query,
				params: req.params
			});
			return next();
		} catch (err) {
			if (err instanceof Error) {
				return res.send({
					data: null,
					success: false,
					message: err.message
				});
			} else {
				console.error("Joi Validation Error occoured:: ", err);
			}
		}
	};

export default validate;
