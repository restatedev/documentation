import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "adminapi/admin-api",
    },
    {
      type: "category",
      label: "deployment",
      link: {
        type: "doc",
        id: "adminapi/deployment",
      },
      items: [
        {
          type: "doc",
          id: "adminapi/list-deployments",
          label: "List deployments",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "adminapi/create-deployment",
          label: "Create deployment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "adminapi/get-deployment",
          label: "Get deployment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "adminapi/update-deployment",
          label: "Update deployment",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "adminapi/delete-deployment",
          label: "Delete deployment",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "invocation",
      link: {
        type: "doc",
        id: "adminapi/invocation",
      },
      items: [
        {
          type: "doc",
          id: "adminapi/delete-invocation",
          label: "Delete an invocation",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "subscription",
      link: {
        type: "doc",
        id: "adminapi/subscription",
      },
      items: [
        {
          type: "doc",
          id: "adminapi/list-subscriptions",
          label: "List subscriptions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "adminapi/create-subscription",
          label: "Create subscription",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "adminapi/get-subscription",
          label: "Get subscription",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "adminapi/delete-subscription",
          label: "Delete subscription",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "service",
      link: {
        type: "doc",
        id: "adminapi/service",
      },
      items: [
        {
          type: "doc",
          id: "adminapi/list-services",
          label: "List services",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "adminapi/get-service",
          label: "Get service",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "adminapi/modify-service",
          label: "Modify a service",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "adminapi/get-service-openapi",
          label: "Get service OpenAPI",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "adminapi/modify-service-state",
          label: "Modify a service state",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "service_handler",
      link: {
        type: "doc",
        id: "adminapi/service-handler",
      },
      items: [
        {
          type: "doc",
          id: "adminapi/list-service-handlers",
          label: "List service handlers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "adminapi/get-service-handler",
          label: "Get service handler",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "cluster_health",
      link: {
        type: "doc",
        id: "adminapi/cluster-health",
      },
      items: [
        {
          type: "doc",
          id: "adminapi/cluster-health",
          label: "Cluster health",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "health",
      link: {
        type: "doc",
        id: "adminapi/health",
      },
      items: [
        {
          type: "doc",
          id: "adminapi/health",
          label: "Health check",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "version",
      link: {
        type: "doc",
        id: "adminapi/version",
      },
      items: [
        {
          type: "doc",
          id: "adminapi/version",
          label: "Admin version information",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "openapi",
      items: [
        {
          type: "doc",
          id: "adminapi/openapi-spec",
          label: "OpenAPI specification",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
