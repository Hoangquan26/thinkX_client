export default function usePermission(userRoles: number) {
  return function (requiredPermission: number): boolean {
    return (userRoles & requiredPermission) === requiredPermission;
  };
}