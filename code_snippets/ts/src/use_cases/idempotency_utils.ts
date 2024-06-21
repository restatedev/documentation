import * as restate from "@restatedev/restate-sdk";
import { Context } from "@restatedev/restate-sdk";

const productService = restate.service({
  name: "product",
  handlers: {
    reserve: async (ctx: Context, product: string) => {},
  },
});

export type ProductService = typeof productService;
