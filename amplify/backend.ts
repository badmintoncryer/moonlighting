import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { Stack } from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";

const backend = defineBackend({
  auth,
  data,
});

const { cfnUserPool } = backend.auth.resources.cfnResources;
const authStack = Stack.of(cfnUserPool);

new cognito.CfnUserPoolDomain(authStack, "Domain", {
  userPoolId: cfnUserPool.ref,
  domain: "moonlighting",
});
